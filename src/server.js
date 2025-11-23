import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

//load env
dotenv.config({ path: '.env' });

const app = express();

const PORT = process.env.APP_PORT || 5050;

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
import authRoute from "./routes/auth.route.js";
import categoryRoute from "./routes/category.route.js";
import bookRoute from "./routes/book.route.js";

app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/books", bookRoute);

app.listen(PORT, () => {
    console.log(`server up and running at PORT ${PORT}`);
})