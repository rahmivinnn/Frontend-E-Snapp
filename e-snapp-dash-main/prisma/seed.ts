import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Hash password function since we can't import it directly
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  console.log('Seeding database...');

  // Clean up existing data
  await prisma.energyConsumption.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.tariff.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const hashedPassword = await hashPassword('password123');
  
  const user1 = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Test User',
      password: hashedPassword,
      profile: {
        create: {
          address: 'Via Roma 123, Milano',
          phone: '+39 123 456 7890',
          contract: 'CONT-12345',
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log('Created user:', user1.email);

  // Create tariffs
  const tariffs = await Promise.all([
    prisma.tariff.create({
      data: {
        name: 'Basic Energy Plan',
        description: 'Standard energy plan with fixed rates',
        annualCost: 1200.0,
        estimatedSaving: 0,
        fixedPeriod: 12,
        isPopular: true,
      },
    }),
    prisma.tariff.create({
      data: {
        name: 'Green Energy Plan',
        description: '100% renewable energy with variable rates',
        annualCost: 1350.0,
        estimatedSaving: 50.0,
        fixedPeriod: 24,
        isPopular: true,
      },
    }),
    prisma.tariff.create({
      data: {
        name: 'Economy Saver',
        description: 'Low-cost energy plan for budget-conscious customers',
        annualCost: 1100.0,
        estimatedSaving: 100.0,
        fixedPeriod: 18,
        isPopular: true,
      },
    }),
    prisma.tariff.create({
      data: {
        name: 'Premium Green',
        description: 'Premium 100% renewable energy with smart home features',
        annualCost: 1500.0,
        estimatedSaving: 20.0,
        fixedPeriod: 24,
        isPopular: false,
      },
    }),
    prisma.tariff.create({
      data: {
        name: 'Flex Energy',
        description: 'Flexible energy plan with no long-term commitment',
        annualCost: 1250.0,
        estimatedSaving: 75.0,
        fixedPeriod: 0,
        isPopular: false,
      },
    }),
  ]);

  console.log(`Created ${tariffs.length} tariffs`);

  // Create bills
  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  const twoMonthsAgo = new Date(currentDate);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const bills = await Promise.all([
    prisma.bill.create({
      data: {
        userId: user1.id,
        amount: 95.0,
        energyUsed: 320,
        period: 'March 2023',
        dueDate: threeMonthsAgo,
        isPaid: true,
      },
    }),
    prisma.bill.create({
      data: {
        userId: user1.id,
        amount: 105.0,
        energyUsed: 350,
        period: 'April 2023',
        dueDate: twoMonthsAgo,
        isPaid: true,
      },
    }),
    prisma.bill.create({
      data: {
        userId: user1.id,
        amount: 110.0,
        energyUsed: 370,
        period: 'May 2023',
        dueDate: oneMonthAgo,
        isPaid: true,
      },
    }),
    prisma.bill.create({
      data: {
        userId: user1.id,
        amount: 120.0,
        energyUsed: 400,
        period: 'June 2023',
        dueDate: new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
        isPaid: false,
        estimatedFinal: 130.0,
      },
    }),
  ]);

  console.log(`Created ${bills.length} bills`);

  // Create energy consumption records
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const energyData = [];
  
  // Generate data for the last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Home appliances
    energyData.push({
      userId: user1.id,
      amount: Math.random() * 5 + 3, // 3-8 kWh
      category: 'Home Appliances',
      date: new Date(date),
    });
    
    // Heating/Cooling
    energyData.push({
      userId: user1.id,
      amount: Math.random() * 4 + 2, // 2-6 kWh
      category: 'Heating/Cooling',
      date: new Date(date),
    });
    
    // Lighting
    energyData.push({
      userId: user1.id,
      amount: Math.random() * 2 + 1, // 1-3 kWh
      category: 'Lighting',
      date: new Date(date),
    });
    
    // Electronics
    energyData.push({
      userId: user1.id,
      amount: Math.random() * 3 + 2, // 2-5 kWh
      category: 'Electronics',
      date: new Date(date),
    });
  }
  
  await prisma.energyConsumption.createMany({
    data: energyData,
  });

  console.log(`Created ${energyData.length} energy consumption records`);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });