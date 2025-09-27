import dotenv from 'dotenv';
import transporter from '../config/nodemailer.js';
import { config } from '../config/config.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendVerificationEmail = async (name, email, token) => {
  const verificationUrl = `${config.appUrl}/auth/verify-email?token=${token}`;

  const emailTemplatePath = path.join(__dirname, '..', 'templates', 'emailTemplate.html');

  const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

  // Replace placeholders in the email template
  const emailContent = emailTemplate
    .replace('{{name}}', name)
    .replace('{{verificationLink}}', verificationUrl);


  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: emailContent,
  };

  await transporter.sendMail(mailOptions);
};
