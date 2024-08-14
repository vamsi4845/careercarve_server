import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create mentors
  const mentors = await prisma.mentor.createMany({
    data: [
      { 
        name: 'John Doe', 
        yoe: 10, 
        areasOfExpertise: ['E-Commerce', 'Digital Marketing'],
        companies: ['Amazon', 'Microsoft'],
        availabilities: [
          { day: 'Monday', startTime: '19:00', endTime: '21:00' },
          { day: 'Tuesday', startTime: '19:00', endTime: '21:00' }
        ]
      },
      { 
        name: 'Jane Smith', 
        yoe: 8, 
        areasOfExpertise: ['Digital Marketing'],
        companies: ['Google'],
        availabilities: [
          { day: 'Wednesday', startTime: '19:00', endTime: '21:00' },
          { day: 'Thursday', startTime: '19:00', endTime: '21:00' }
        ]
      },
      { 
        name: 'Bob Johnson', 
        yoe: 12, 
        areasOfExpertise: ['E-Commerce', 'FMCG Sales'],
        companies: ['Amazon', 'Facebook'],
        availabilities: [
          { day: 'Friday', startTime: '19:00', endTime: '21:00' },
          { day: 'Saturday', startTime: '10:00', endTime: '12:00' }
        ]
      },
      { 
        name: 'Emily Chen', 
        yoe: 15, 
        areasOfExpertise: ['Data Science', 'Machine Learning'],
        companies: ['IBM', 'Netflix'],
        availabilities: [
          { day: 'Monday', startTime: '18:00', endTime: '20:00' },
          { day: 'Thursday', startTime: '19:00', endTime: '21:00' }
        ]
      },
      { 
        name: 'David Kim', 
        yoe: 7, 
        areasOfExpertise: ['UX Design', 'Product Management'],
        companies: ['Apple', 'Airbnb'],
        availabilities: [
          { day: 'Tuesday', startTime: '20:00', endTime: '22:00' },
          { day: 'Saturday', startTime: '14:00', endTime: '16:00' }
        ]
      },
      { 
        name: 'Sarah Rodriguez', 
        yoe: 9, 
        areasOfExpertise: ['Cybersecurity', 'Cloud Computing'],
        companies: ['Cisco', 'Oracle'],
        availabilities: [
          { day: 'Wednesday', startTime: '18:00', endTime: '20:00' },
          { day: 'Friday', startTime: '19:00', endTime: '21:00' }
        ]
      },
      { 
        name: 'Michael Zhang', 
        yoe: 11, 
        areasOfExpertise: ['Mobile Development', 'IoT'],
        companies: ['Samsung', 'Huawei'],
        availabilities: [
          { day: 'Monday', startTime: '20:00', endTime: '22:00' },
          { day: 'Thursday', startTime: '18:00', endTime: '20:00' }
        ]
      },
      { 
        name: 'Laura Thompson', 
        yoe: 6, 
        areasOfExpertise: ['Digital Marketing', 'Content Strategy'],
        companies: ['HubSpot', 'Salesforce'],
        availabilities: [
          { day: 'Tuesday', startTime: '19:00', endTime: '21:00' },
          { day: 'Saturday', startTime: '10:00', endTime: '12:00' }
        ]
      },
      { 
        name: 'Alex Patel', 
        yoe: 13, 
        areasOfExpertise: ['Blockchain', 'Cryptocurrency'],
        companies: ['Coinbase', 'Ethereum Foundation'],
        availabilities: [
          { day: 'Wednesday', startTime: '20:00', endTime: '22:00' },
          { day: 'Sunday', startTime: '14:00', endTime: '16:00' }
        ]
      },
      { 
        name: 'Olivia Foster', 
        yoe: 8, 
        areasOfExpertise: ['AI Ethics', 'Responsible AI'],
        companies: ['OpenAI', 'DeepMind'],
        availabilities: [
          { day: 'Monday', startTime: '19:00', endTime: '21:00' },
          { day: 'Friday', startTime: '18:00', endTime: '20:00' }
        ]
      },
      { 
        name: 'Daniel Lee', 
        yoe: 10, 
        areasOfExpertise: ['DevOps', 'Site Reliability Engineering'],
        companies: ['Google', 'Atlassian'],
        availabilities: [
          { day: 'Tuesday', startTime: '18:00', endTime: '20:00' },
          { day: 'Thursday', startTime: '20:00', endTime: '22:00' }
        ]
      },
      { 
        name: 'Emma Wilson', 
        yoe: 7, 
        areasOfExpertise: ['AR/VR Development', 'Game Design'],
        companies: ['Unity', 'Epic Games'],
        availabilities: [
          { day: 'Wednesday', startTime: '19:00', endTime: '21:00' },
          { day: 'Saturday', startTime: '15:00', endTime: '17:00' }
        ]
      },
      { 
        name: 'Ryan Murphy', 
        yoe: 12, 
        areasOfExpertise: ['Fintech', 'Quantitative Finance'],
        companies: ['JPMorgan Chase', 'Bloomberg'],
        availabilities: [
          { day: 'Monday', startTime: '18:00', endTime: '20:00' },
          { day: 'Thursday', startTime: '19:00', endTime: '21:00' }
        ]
      },
    ],
  });

  // Create students
  await prisma.student.createMany({
    data: [
      { name: 'Alice Johnson', areaOfInterest: 'Digital Marketing' },
      { name: 'Michael Brown', areaOfInterest: 'E-Commerce' },
      { name: 'Sarah Lee', areaOfInterest: 'Data Science' },
      { name: 'Tom Wilson', areaOfInterest: 'UX Design' },
      { name: 'Emma Davis', areaOfInterest: 'Machine Learning' },
    ],
  });

  // Create schedules (example)
  const mentorIds = await prisma.mentor.findMany({ select: { id: true } });
  const studentIds = await prisma.student.findMany({ select: { id: true } });

  await prisma.schedule.createMany({
    data: [
      {
        startTime: new Date('2024-08-14T19:00:00Z'),
        endTime: new Date('2024-08-14T20:00:00Z'),
        studentId: studentIds[0].id,
        mentorId: mentorIds[0].id,
      },
      {
        startTime: new Date('2024-08-15T19:00:00Z'),
        endTime: new Date('2024-08-15T20:00:00Z'),
        studentId: studentIds[1].id,
        mentorId: mentorIds[1].id,
      },
      {
        startTime: new Date('2024-08-16T18:00:00Z'),
        endTime: new Date('2024-08-16T19:00:00Z'),
        studentId: studentIds[2].id,
        mentorId: mentorIds[3].id,
      },
      {
        startTime: new Date('2024-08-17T14:00:00Z'),
        endTime: new Date('2024-08-17T15:30:00Z'),
        studentId: studentIds[3].id,
        mentorId: mentorIds[4].id,
      },
    ],
  });

  // Create payments (example)
  await prisma.payment.createMany({
    data: [
      {
        amount: 100,
        duration: 60,
        studentId: studentIds[0].id,
        mentorId: mentorIds[0].id,
      },
      {
        amount: 150,
        duration: 90,
        studentId: studentIds[1].id,
        mentorId: mentorIds[1].id,
      },
      {
        amount: 120,
        duration: 60,
        studentId: studentIds[2].id,
        mentorId: mentorIds[3].id,
      },
      {
        amount: 180,
        duration: 90,
        studentId: studentIds[3].id,
        mentorId: mentorIds[4].id,
      },
    ],
  });
}

main()