import dotenv from 'dotenv';

dotenv.config();

export const config = {
    appUrl: process.env.BACKEND_URL,
    db: {
        usersCollection: process.env.USERS_COLLECTION || 'Users',
    },
    email: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    jwt: {
        secretKey: process.env.JWT_SECRET,
    },
};
