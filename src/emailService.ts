import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Use your email provider's SMTP server
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface ScheduleEmailData {
  studentName: string;
  studentEmail: string;
  mentorName: string;
  date: string;
  startTime: string;
  duration: number;
}

export async function sendScheduleConfirmationEmail(data: ScheduleEmailData) {
  const { studentName, studentEmail, mentorName, date, startTime, duration } = data;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: studentEmail,
    subject: 'Mentorship Session Scheduled - Confirmation',
    html: `
      <h1>Mentorship Session Confirmation</h1>
      <p>Hello ${studentName},</p>
      <p>Your mentorship session has been successfully scheduled. Here are the details:</p>
      <ul>
        <li>Mentor: ${mentorName}</li>
        <li>Date: ${date}</li>
        <li>Start Time: ${startTime}</li>
        <li>Duration: ${duration} minutes</li>
      </ul>
      <p>Please review these details carefully. If you need to make any changes or have any questions, please contact us immediately.</p>
      <p>We recommend adding this session to your calendar to ensure you don't miss it.</p>
      <p>Best regards,<br>Your Mentorship Team</p>
      <p>Visit our website: <Link href="https://www.careercarve.com/">https://www.careercarve.com</a></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Schedule confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending schedule confirmation email:', error);
  }
}