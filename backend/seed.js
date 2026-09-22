require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/database');
const Admin = require('./src/models/Admin');
const Member = require('./src/models/Member');
const Payment = require('./src/models/Payment');

const seedData = async () => {
  try {
    await connectDB();
    await Admin.deleteMany();
    await Member.deleteMany();
    await Payment.deleteMany();
    
    console.log('Cleared existing data.');

    await Admin.create({
      name: 'Sameer Wanjari',
      email: 'admin@maharashtradarbar.com',
      password: 'admin@2026',
      role: 'ADMIN'
    });
    
    console.log('Admin created.');

    const memberData = [
      { name: 'Rahul Patil', membershipType: 'Regular', mobile: '9876543210', monthlyFee: 2300 },
      { name: 'Priya Deshmukh', membershipType: 'Special', mobile: '9876543211', monthlyFee: 2800 },
      { name: 'Amit More', membershipType: 'Premium', mobile: '9876543212', monthlyFee: 3200 },
      { name: 'Sneha Kulkarni', membershipType: 'Regular', mobile: '9876543213', monthlyFee: 2300 },
      { name: 'Vikram Jadhav', membershipType: 'Special', mobile: '9876543214', monthlyFee: 2800 },
      { name: 'Pooja Shinde', membershipType: 'Regular', mobile: '9876543215', monthlyFee: 2300 },
      { name: 'Sanjay Bhosale', membershipType: 'Premium', mobile: '9876543216', monthlyFee: 3200 },
      { name: 'Kavita Pawar', membershipType: 'Regular', mobile: '9876543217', monthlyFee: 2300 },
      { name: 'Ravi Sawant', membershipType: 'Special', mobile: '9876543218', monthlyFee: 2800 },
      { name: 'Anita Wagh', membershipType: 'Regular', mobile: '9876543219', monthlyFee: 2300 },
      { name: 'Deepak Naik', membershipType: 'Regular', mobile: '9876543220', monthlyFee: 2300 },
      { name: 'Sunita Kale', membershipType: 'Special', mobile: '9876543221', monthlyFee: 2800 },
      { name: 'Mahesh Gaikwad', membershipType: 'Premium', mobile: '9876543222', monthlyFee: 3200 },
      { name: 'Rekha Mane', membershipType: 'Regular', mobile: '9876543223', monthlyFee: 2300 },
      { name: 'Suresh Kamble', membershipType: 'Regular', mobile: '9876543224', monthlyFee: 2300 },
      { name: 'Nisha Ghule', membershipType: 'Special', mobile: '9876543225', monthlyFee: 2800 },
      { name: 'Arun Salunke', membershipType: 'Regular', mobile: '9876543226', monthlyFee: 2300 },
      { name: 'Meena Thorat', membershipType: 'Regular', mobile: '9876543227', monthlyFee: 2300 },
      { name: 'Prakash Deshpande', membershipType: 'Premium', mobile: '9876543228', monthlyFee: 3200 },
      { name: 'Jyoti Lomte', membershipType: 'Regular', mobile: '9876543229', monthlyFee: 2300 },
      { name: 'Ganesh Yadav', membershipType: 'Special', mobile: '9876543230', monthlyFee: 2800 },
      { name: 'Lata Kumbhar', membershipType: 'Regular', mobile: '9876543231', monthlyFee: 2300 },
      { name: 'Nilesh Chavan', membershipType: 'Regular', mobile: '9876543232', monthlyFee: 2300 },
      { name: 'Pallavi Mhetre', membershipType: 'Special', mobile: '9876543233', monthlyFee: 2800 },
      { name: 'Vinod Kadam', membershipType: 'Regular', mobile: '9876543234', monthlyFee: 2300 },
      { name: 'Sudha Raut', membershipType: 'Regular', mobile: '9876543235', monthlyFee: 2300 },
      { name: 'Kishore Dhage', membershipType: 'Premium', mobile: '9876543236', monthlyFee: 3200 },
      { name: 'Anjali Ghodke', membershipType: 'Regular', mobile: '9876543237', monthlyFee: 2300 },
      { name: 'Mohan Waghmare', membershipType: 'Special', mobile: '9876543238', monthlyFee: 2800 },
      { name: 'Savita Pokharkar', membershipType: 'Regular', mobile: '9876543239', monthlyFee: 2300 }
    ];

    let count = 1;
    for (const m of memberData) {
      m.memberId = `MD${String(count).padStart(3, '0')}`;
      m.joiningDate = new Date('2025-01-01');
      count++;
    }

    const createdMembers = await Member.insertMany(memberData);
    console.log(`${createdMembers.length} members created.`);

    const payments = [];
    for (let i = 0; i < createdMembers.length; i++) {
      const m = createdMembers[i];
      if (i < 20) {
        payments.push({
          member: m._id,
          amount: m.monthlyFee,
          paymentDate: new Date('2026-10-01'),
          validFrom: new Date('2026-10-01'),
          validTill: new Date('2026-10-31'),
          paymentMode: 'UPI'
        });
        if (i < 10) {
          payments.push({
            member: m._id,
            amount: m.monthlyFee,
            paymentDate: new Date('2026-09-01'),
            validFrom: new Date('2026-09-01'),
            validTill: new Date('2026-09-30'),
            paymentMode: 'UPI'
          });
          payments.push({
            member: m._id,
            amount: m.monthlyFee,
            paymentDate: new Date('2026-08-01'),
            validFrom: new Date('2026-08-01'),
            validTill: new Date('2026-08-31'),
            paymentMode: 'UPI'
          });
        }
      } else {
        payments.push({
          member: m._id,
          amount: m.monthlyFee,
          paymentDate: new Date('2026-08-01'),
          validFrom: new Date('2026-08-01'),
          validTill: new Date('2026-08-31'),
          paymentMode: 'CASH'
        });
      }
    }

    await Payment.insertMany(payments);
    console.log(`${payments.length} payments created.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();