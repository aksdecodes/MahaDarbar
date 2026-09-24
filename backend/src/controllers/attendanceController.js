const crypto = require('crypto');
const AttendanceSession = require('../models/AttendanceSession');
const Attendance = require('../models/Attendance');
const Member = require('../models/Member');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { getTodayDateString, formatTime12Hour, formatDisplayDate } = require('../utils/dateUtils');

/**
 * Generate a secure random token for QR code
 */
const generateSecureToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

/**
 * ADMIN: Create or regenerate today's Lunch QR session
 */
exports.createLunchSession = async (req, res, next) => {
  try {
    const today = getTodayDateString();
    
    // Expire any existing active Lunch sessions for today
    await AttendanceSession.updateMany(
      { date: today, mealType: 'LUNCH', status: 'ACTIVE' },
      { $set: { status: 'EXPIRED' } }
    );

    const token = generateSecureToken();
    const session = await AttendanceSession.create({
      date: today,
      mealType: 'LUNCH',
      token,
      status: 'ACTIVE',
      createdBy: req.admin?._id
    });

    res.status(201).json({
      success: true,
      message: 'Lunch QR session created successfully',
      data: session
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN: Create or regenerate today's Dinner QR session
 */
exports.createDinnerSession = async (req, res, next) => {
  try {
    const today = getTodayDateString();

    // Expire any existing active Dinner sessions for today
    await AttendanceSession.updateMany(
      { date: today, mealType: 'DINNER', status: 'ACTIVE' },
      { $set: { status: 'EXPIRED' } }
    );

    const token = generateSecureToken();
    const session = await AttendanceSession.create({
      date: today,
      mealType: 'DINNER',
      token,
      status: 'ACTIVE',
      createdBy: req.admin?._id
    });

    res.status(201).json({
      success: true,
      message: 'Dinner QR session created successfully',
      data: session
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUBLIC: Get today's active meal sessions (for Public Website)
 */
exports.getPublicToday = async (req, res, next) => {
  try {
    const today = getTodayDateString();

    const lunchSession = await AttendanceSession.findOne({
      date: today,
      mealType: 'LUNCH',
      status: 'ACTIVE'
    }).lean();

    const dinnerSession = await AttendanceSession.findOne({
      date: today,
      mealType: 'DINNER',
      status: 'ACTIVE'
    }).lean();

    res.json({
      success: true,
      date: today,
      formattedDate: formatDisplayDate(today),
      lunch: lunchSession ? {
        active: true,
        token: lunchSession.token,
        mealType: 'LUNCH',
        date: today
      } : {
        active: false,
        token: null,
        mealType: 'LUNCH',
        date: today
      },
      dinner: dinnerSession ? {
        active: true,
        token: dinnerSession.token,
        mealType: 'DINNER',
        date: today
      } : {
        active: false,
        token: null,
        mealType: 'DINNER',
        date: today
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUBLIC / MEMBER: Verify session token info before scanning
 */
exports.verifySessionToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    const today = getTodayDateString();

    const session = await AttendanceSession.findOne({ token }).lean();

    if (!session) {
      return res.status(404).json({
        success: false,
        code: 'INVALID_QR',
        message: 'Invalid attendance QR.'
      });
    }

    if (session.status !== 'ACTIVE' || session.date !== today) {
      return res.status(400).json({
        success: false,
        code: 'INVALID_QR',
        message: 'This QR code is no longer valid.'
      });
    }

    res.json({
      success: true,
      data: {
        date: session.date,
        formattedDate: formatDisplayDate(session.date),
        mealType: session.mealType,
        status: session.status,
        active: true
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * MEMBER: Scan QR and mark attendance
 */
exports.scanAttendance = async (req, res, next) => {
  try {
    const { token } = req.body;
    const today = getTodayDateString();

    if (!token) {
      return res.status(400).json({
        success: false,
        code: 'INVALID_QR',
        message: 'Invalid attendance QR.'
      });
    }

    // 1. Authenticated User Check
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        code: 'UNAUTHORIZED',
        message: 'Please sign in as a member to mark attendance.'
      });
    }

    // 2. Resolve Member Profile
    let member = null;
    if (user.member) {
      member = await Member.findOne({ _id: user.member, isActive: true });
    }
    if (!member) {
      member = await Member.findOne({ mobile: user.mobile, isActive: true });
    }

    if (!member) {
      return res.status(400).json({
        success: false,
        code: 'NOT_ELIGIBLE',
        message: 'Your mess membership is not currently valid.'
      });
    }

    // 3. Verify Membership Validity (check latest PAID payment)
    const latestPayment = await Payment.findOne({
      member: member._id,
      status: 'PAID'
    }).sort({ validTill: -1 });

    const todayZero = new Date();
    todayZero.setHours(0, 0, 0, 0);

    const isMembershipValid = latestPayment && latestPayment.validTill && new Date(latestPayment.validTill) >= todayZero;

    if (!isMembershipValid) {
      return res.status(400).json({
        success: false,
        code: 'NOT_ELIGIBLE',
        message: 'Your mess membership is not currently valid.'
      });
    }

    // 4. Validate QR Session Token
    const session = await AttendanceSession.findOne({ token });

    if (!session) {
      return res.status(400).json({
        success: false,
        code: 'INVALID_QR',
        message: 'Invalid attendance QR.'
      });
    }

    if (session.status !== 'ACTIVE' || session.date !== today) {
      return res.status(400).json({
        success: false,
        code: 'INVALID_QR',
        message: 'This QR code is no longer valid.'
      });
    }

    const mealName = session.mealType === 'LUNCH' ? 'Lunch' : 'Dinner';

    // 5. Check Duplicate Attendance
    const existingAttendance = await Attendance.findOne({
      member: member._id,
      date: session.date,
      mealType: session.mealType
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        code: 'ALREADY_MARKED',
        message: `Your ${mealName} attendance has already been recorded today.`
      });
    }

    // 6. Record Attendance
    let attendanceRecord;
    try {
      attendanceRecord = await Attendance.create({
        member: member._id,
        user: user._id,
        memberId: member.memberId,
        memberName: member.name,
        memberMobile: member.mobile,
        date: session.date,
        mealType: session.mealType,
        status: 'PRESENT',
        markedAt: new Date(),
        sessionId: session._id
      });
    } catch (dbErr) {
      if (dbErr.code === 11000) {
        return res.status(400).json({
          success: false,
          code: 'ALREADY_MARKED',
          message: `Your ${mealName} attendance has already been recorded today.`
        });
      }
      throw dbErr;
    }

    res.status(200).json({
      success: true,
      code: 'ELIGIBLE',
      message: `Your ${mealName} attendance has been successfully marked.`,
      data: {
        id: attendanceRecord._id,
        mealType: attendanceRecord.mealType,
        date: attendanceRecord.date,
        markedAt: attendanceRecord.markedAt,
        markedAtFormatted: formatTime12Hour(attendanceRecord.markedAt)
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * MEMBER: Get logged-in member's today attendance status
 */
exports.getMyTodayAttendance = async (req, res, next) => {
  try {
    const today = getTodayDateString();
    const user = req.user;

    let member = null;
    if (user.member) {
      member = await Member.findOne({ _id: user.member, isActive: true });
    }
    if (!member) {
      member = await Member.findOne({ mobile: user.mobile, isActive: true });
    }

    if (!member) {
      return res.json({
        success: true,
        date: today,
        lunch: { status: 'NOT_MARKED', markedAt: null },
        dinner: { status: 'NOT_MARKED', markedAt: null }
      });
    }

    const records = await Attendance.find({
      member: member._id,
      date: today
    }).lean();

    const lunchRecord = records.find(r => r.mealType === 'LUNCH');
    const dinnerRecord = records.find(r => r.mealType === 'DINNER');

    res.json({
      success: true,
      date: today,
      formattedDate: formatDisplayDate(today),
      lunch: lunchRecord ? {
        status: 'PRESENT',
        markedAt: lunchRecord.markedAt,
        markedAtFormatted: formatTime12Hour(lunchRecord.markedAt)
      } : {
        status: 'NOT_MARKED',
        markedAt: null
      },
      dinner: dinnerRecord ? {
        status: 'PRESENT',
        markedAt: dinnerRecord.markedAt,
        markedAtFormatted: formatTime12Hour(dinnerRecord.markedAt)
      } : {
        status: 'NOT_MARKED',
        markedAt: null
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN: Get today's attendance summary & lists
 */
exports.getTodaySummary = async (req, res, next) => {
  try {
    const today = getTodayDateString();

    // Get active sessions
    const lunchSession = await AttendanceSession.findOne({ date: today, mealType: 'LUNCH', status: 'ACTIVE' }).lean();
    const dinnerSession = await AttendanceSession.findOne({ date: today, mealType: 'DINNER', status: 'ACTIVE' }).lean();

    // Get attendance records
    const lunchAttendance = await Attendance.find({ date: today, mealType: 'LUNCH' })
      .sort({ markedAt: -1 })
      .lean();

    const dinnerAttendance = await Attendance.find({ date: today, mealType: 'DINNER' })
      .sort({ markedAt: -1 })
      .lean();

    const formatList = (list) => list.map(item => ({
      id: item._id,
      memberId: item.memberId,
      name: item.memberName,
      mobile: item.memberMobile,
      time: formatTime12Hour(item.markedAt),
      markedAt: item.markedAt,
      status: item.status
    }));

    res.json({
      success: true,
      date: today,
      formattedDate: formatDisplayDate(today),
      lunch: {
        active: !!lunchSession,
        session: lunchSession || null,
        count: lunchAttendance.length,
        members: formatList(lunchAttendance)
      },
      dinner: {
        active: !!dinnerSession,
        session: dinnerSession || null,
        count: dinnerAttendance.length,
        members: formatList(dinnerAttendance)
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN: Get Lunch attendance specifically
 */
exports.getTodayLunch = async (req, res, next) => {
  try {
    const today = getTodayDateString();
    const session = await AttendanceSession.findOne({ date: today, mealType: 'LUNCH', status: 'ACTIVE' }).lean();
    const records = await Attendance.find({ date: today, mealType: 'LUNCH' }).sort({ markedAt: -1 }).lean();

    res.json({
      success: true,
      date: today,
      active: !!session,
      session,
      count: records.length,
      members: records.map(r => ({
        id: r._id,
        memberId: r.memberId,
        name: r.memberName,
        mobile: r.memberMobile,
        time: formatTime12Hour(r.markedAt),
        status: r.status
      }))
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN: Get Dinner attendance specifically
 */
exports.getTodayDinner = async (req, res, next) => {
  try {
    const today = getTodayDateString();
    const session = await AttendanceSession.findOne({ date: today, mealType: 'DINNER', status: 'ACTIVE' }).lean();
    const records = await Attendance.find({ date: today, mealType: 'DINNER' }).sort({ markedAt: -1 }).lean();

    res.json({
      success: true,
      date: today,
      active: !!session,
      session,
      count: records.length,
      members: records.map(r => ({
        id: r._id,
        memberId: r.memberId,
        name: r.memberName,
        mobile: r.memberMobile,
        time: formatTime12Hour(r.markedAt),
        status: r.status
      }))
    });
  } catch (error) {
    next(error);
  }
};
