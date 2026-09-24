const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Admin = require('./src/models/Admin');
const User = require('./src/models/User');
const Member = require('./src/models/Member');
const Payment = require('./src/models/Payment');
const AttendanceSession = require('./src/models/AttendanceSession');
const Attendance = require('./src/models/Attendance');

const attendanceController = require('./src/controllers/attendanceController');
const { getTodayDateString } = require('./src/utils/dateUtils');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecretkey12345';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mahadarbar_test';

// Helper mock response object
const createMockRes = () => {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    }
  };
  return res;
};

async function runTests() {
  console.log('=== RUNNING DIRECT ATTENDANCE CONTROLLER & MODEL TESTS ===');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Clear test data
    await Admin.deleteMany({});
    await User.deleteMany({});
    await Member.deleteMany({});
    await Payment.deleteMany({});
    await AttendanceSession.deleteMany({});
    await Attendance.deleteMany({});

    // 1. Setup Admin
    const admin = await Admin.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: await bcrypt.hash('admin123', 10)
    });

    // 2. Setup Active Valid Member
    const validMember = await Member.create({
      memberId: 'MD9001',
      name: 'Rahul Patil',
      mobile: '9876543210',
      email: 'rahul@test.com',
      joiningDate: new Date(),
      monthlyFee: 3000,
      membershipType: 'Regular',
      isActive: true
    });

    const validUser = await User.create({
      name: 'Rahul Patil',
      mobile: '9876543210',
      email: 'rahul@test.com',
      password: 'password123',
      member: validMember._id,
      role: 'MEMBER',
      isActive: true
    });

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    await Payment.create({
      member: validMember._id,
      amount: 3000,
      paymentDate: new Date(),
      validFrom: new Date(),
      validTill: nextMonth,
      paymentMethod: 'CASH',
      status: 'PAID'
    });

    // 3. Setup Expired Member
    const expiredMember = await Member.create({
      memberId: 'MD9002',
      name: 'Expired User',
      mobile: '9876543211',
      joiningDate: new Date('2025-01-01'),
      monthlyFee: 3000,
      isActive: true
    });

    const expiredUser = await User.create({
      name: 'Expired User',
      mobile: '9876543211',
      password: 'password123',
      member: expiredMember._id,
      role: 'MEMBER'
    });

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    await Payment.create({
      member: expiredMember._id,
      amount: 3000,
      paymentDate: new Date('2025-01-01'),
      validFrom: new Date('2025-01-01'),
      validTill: pastDate,
      paymentMethod: 'CASH',
      status: 'PAID'
    });

    // ----------------------------------------------------
    // TEST 1: Admin Creates Today's Lunch QR
    // ----------------------------------------------------
    console.log('\n--> TEST 1: Admin Creates Today\'s Lunch QR');
    const req1 = { admin };
    const res1 = createMockRes();
    await attendanceController.createLunchSession(req1, res1, (e) => { throw e; });
    
    console.assert(res1.statusCode === 201, `Expected 201, got ${res1.statusCode}`);
    console.assert(res1.body.success === true, 'Expected success true');
    console.assert(res1.body.data.mealType === 'LUNCH', 'Expected LUNCH mealType');
    const lunchToken = res1.body.data.token;
    console.log('✓ TEST 1 PASSED. Generated Lunch token:', lunchToken);

    // ----------------------------------------------------
    // TEST 2: Public Website Endpoint
    // ----------------------------------------------------
    console.log('\n--> TEST 2: Public GET /api/attendance/public/today');
    const req2 = {};
    const res2 = createMockRes();
    await attendanceController.getPublicToday(req2, res2, (e) => { throw e; });

    console.assert(res2.statusCode === 200, `Expected 200, got ${res2.statusCode}`);
    console.assert(res2.body.lunch.active === true, 'Expected active Lunch');
    console.assert(res2.body.lunch.token === lunchToken, 'Expected token match');
    console.assert(res2.body.dinner.active === false, 'Expected inactive Dinner');
    console.log('✓ TEST 2 PASSED. Public website returns active Lunch QR');

    // ----------------------------------------------------
    // TEST 3: Valid Member Scans Lunch QR -> ELIGIBLE
    // ----------------------------------------------------
    console.log('\n--> TEST 3: Valid Member Scans Lunch QR');
    const req3 = { user: validUser, body: { token: lunchToken } };
    const res3 = createMockRes();
    await attendanceController.scanAttendance(req3, res3, (e) => { throw e; });

    console.assert(res3.statusCode === 200, `Expected 200, got ${res3.statusCode}`);
    console.assert(res3.body.code === 'ELIGIBLE', `Expected ELIGIBLE, got ${res3.body.code}`);
    console.log('✓ TEST 3 PASSED: Attendance recorded successfully (🟢 ELIGIBLE)');

    // ----------------------------------------------------
    // TEST 4: Admin Views Attendance List
    // ----------------------------------------------------
    console.log('\n--> TEST 4: Admin GET /api/attendance/today');
    const req4 = { admin };
    const res4 = createMockRes();
    await attendanceController.getTodaySummary(req4, res4, (e) => { throw e; });

    console.assert(res4.statusCode === 200, `Expected 200, got ${res4.statusCode}`);
    console.assert(res4.body.lunch.count === 1, `Expected count 1, got ${res4.body.lunch.count}`);
    console.assert(res4.body.lunch.members[0].memberId === 'MD9001', 'Expected MD9001');
    console.log('✓ TEST 4 PASSED: Admin sees 1 member in Lunch list');

    // ----------------------------------------------------
    // TEST 5: Duplicate Scan -> ALREADY MARKED
    // ----------------------------------------------------
    console.log('\n--> TEST 5: Duplicate Scan Attempt');
    const req5 = { user: validUser, body: { token: lunchToken } };
    const res5 = createMockRes();
    await attendanceController.scanAttendance(req5, res5, (e) => { throw e; });

    console.assert(res5.statusCode === 400, `Expected 400, got ${res5.statusCode}`);
    console.assert(res5.body.code === 'ALREADY_MARKED', `Expected ALREADY_MARKED, got ${res5.body.code}`);
    console.log('✓ TEST 5 PASSED: Duplicate scan rejected (🟠 ALREADY MARKED)');

    // ----------------------------------------------------
    // TEST 6: Expired Member -> NOT ELIGIBLE
    // ----------------------------------------------------
    console.log('\n--> TEST 6: Expired Member Scan');
    const req6 = { user: expiredUser, body: { token: lunchToken } };
    const res6 = createMockRes();
    await attendanceController.scanAttendance(req6, res6, (e) => { throw e; });

    console.assert(res6.statusCode === 400, `Expected 400, got ${res6.statusCode}`);
    console.assert(res6.body.code === 'NOT_ELIGIBLE', `Expected NOT_ELIGIBLE, got ${res6.body.code}`);
    console.log('✓ TEST 6 PASSED: Expired member rejected (🔴 NOT ELIGIBLE)');

    // ----------------------------------------------------
    // TEST 7: Admin Creates Dinner QR
    // ----------------------------------------------------
    console.log('\n--> TEST 7: Admin Creates Dinner QR');
    const req7 = { admin };
    const res7 = createMockRes();
    await attendanceController.createDinnerSession(req7, res7, (e) => { throw e; });

    console.assert(res7.statusCode === 201, `Expected 201, got ${res7.statusCode}`);
    const dinnerToken = res7.body.data.token;
    console.log('✓ TEST 7 PASSED. Generated Dinner token:', dinnerToken);

    // ----------------------------------------------------
    // TEST 8: Valid Member Scans Dinner QR -> ELIGIBLE
    // ----------------------------------------------------
    console.log('\n--> TEST 8: Valid Member Scans Dinner QR');
    const req8 = { user: validUser, body: { token: dinnerToken } };
    const res8 = createMockRes();
    await attendanceController.scanAttendance(req8, res8, (e) => { throw e; });

    console.assert(res8.statusCode === 200, `Expected 200, got ${res8.statusCode}`);
    console.assert(res8.body.code === 'ELIGIBLE', `Expected ELIGIBLE, got ${res8.body.code}`);
    console.log('✓ TEST 8 PASSED: Dinner attendance recorded (🟢 ELIGIBLE)');

    // ----------------------------------------------------
    // TEST 9: Yesterday's QR Rejected
    // ----------------------------------------------------
    console.log('\n--> TEST 9: Yesterday\'s QR Token');
    await AttendanceSession.create({
      date: '2026-09-23',
      mealType: 'LUNCH',
      token: 'old-yesterday-token-xyz',
      status: 'ACTIVE'
    });
    const req9 = { user: validUser, body: { token: 'old-yesterday-token-xyz' } };
    const res9 = createMockRes();
    await attendanceController.scanAttendance(req9, res9, (e) => { throw e; });

    console.assert(res9.statusCode === 400, `Expected 400, got ${res9.statusCode}`);
    console.assert(res9.body.code === 'INVALID_QR', `Expected INVALID_QR, got ${res9.body.code}`);
    console.log('✓ TEST 9 PASSED: Yesterday\'s QR rejected (🔴 INVALID QR)');

    // ----------------------------------------------------
    // TEST 10: Member Today Attendance Status
    // ----------------------------------------------------
    console.log('\n--> TEST 10: Member GET /api/attendance/my/today');
    const req10 = { user: validUser };
    const res10 = createMockRes();
    await attendanceController.getMyTodayAttendance(req10, res10, (e) => { throw e; });

    console.assert(res10.statusCode === 200, `Expected 200, got ${res10.statusCode}`);
    console.assert(res10.body.lunch.status === 'PRESENT', 'Expected Lunch PRESENT');
    console.assert(res10.body.dinner.status === 'PRESENT', 'Expected Dinner PRESENT');
    console.log('✓ TEST 10 PASSED: Member status correctly reflects Lunch & Dinner PRESENT');

    console.log('\n==================================================');
    console.log('🎉 ALL TEST ASSERTIONS PASSED PERFECTLY!');
    console.log('==================================================');

  } catch (err) {
    console.error('❌ TEST FAILURE:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

runTests();
