import express from "express";
import { db } from "./config/firebase.js";
import authRoutes from "./routes/auth.routes.js";
import morgan from 'morgan';
import helmet from 'helmet';



const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.get("/health", (req, res) => {
    // check db connection status
    res.json(JSON.stringify(db));
});
// ------------------ Endpoints ------------------
app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});