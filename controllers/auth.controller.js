import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userRef from '../models/user.model.js';
import { SECRET_KEY } from '../config/token.js';
import { validationResult } from 'express-validator';
import transporter from '../config/nodemailer.js';
import { uploadFileToImgBB } from '../config/upload.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (req, res) => {
    // Validate the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const image = req.file ? req.file.filename : null;
    const imageUrl = req.file ? (await uploadFileToImgBB(req.file.path)) : null;

    // Check if email already exists
    const existingUser = await userRef.where('email', '==', email).get();
    if (!existingUser.empty) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create the user document in Firestore
    const user = userRef.doc();
    const uid = user.id;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await user.set({
            name,
            email,
            password: hashedPassword,
            uid,
            role: 'user',  // default role
            profileImage: image ? imageUrl.url : "no image uploaded yet.",
            emailVerified: false
        });

        // Generate a JWT for email verification
        const token = jwt.sign(
            { uid, email },
            SECRET_KEY,
            { expiresIn: '1h' }  // Set expiration time for the token
        );

        const emailTemplatePath = path.join(__dirname, '..', 'templates', 'emailTemplate.html');
        console.log(emailTemplatePath);
        const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
        const verificationUrl = `${process.env.BACKEND_URL}/auth/verify-email?token=${token}`;

        // Replace placeholders in the email template
        const emailContent = emailTemplate
            .replace('{{name}}', name)
            .replace('{{verificationLink}}', verificationUrl);


        const mailOptions = {
            from: process.env.GMAIL_USER,  // Sender's email
            to: email,                     // Recipient's email
            subject: 'Verify Your Email Address',
            html: emailContent,
        };

        // Send email using the transporter
        await transporter.sendMail(mailOptions);

        // Get the created user data
        const userData = (await user.get()).data();

        // Send response
        res.status(201).json({
            message: 'User created. Please check your email to verify your account.',
            userData,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

export const verifyEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        const { uid, email } = decoded;

        // Check if the user exists
        const userSnapshot = await userRef.doc(uid).get();
        if (!userSnapshot.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Activate the user (set emailVerified to true)
        await userRef.doc(uid).update({ emailVerified: true });

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userRef.where("email", "==", email).get();
    if (user.empty) {
        return res.status(401).json({ message: "User not found" });

    }
    const userDoc = user.docs[0];
    //check if user is verified
    if (!userDoc.data().emailVerified) {
        return res.status(401).json({ message: "User is not verified, please verify your email first" });
    }
    const isPasswordValid = await bcrypt.compare(password, userDoc.data().password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "wrong password" });

    }
    try {
        const token = jwt.sign({ id: userDoc.id, role: userDoc.data().role }, SECRET_KEY);
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Error creating token" });
    }
}