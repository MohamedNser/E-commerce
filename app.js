import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
//set directory dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });
import express from "express";
import * as indexRouter from "./src/modules/index.router.js";
import connectDB from "./DB/connection.js";
import { globalErrorHandler } from "./src/services/errorHandling.js";
import morgan from "morgan";
const baseUrl = process.env.BASEURL
const port = process.env.PORT;
const app = express();
//convert Buffer Data
app.use(express.json());
if (process.env.MOOD) {
    app.use(morgan('dev'))
} else {
    app.use(morgan("combined"))
}

//Setup API Routing
app.use(`${baseUrl}/auth`, indexRouter.authRouter);
app.use(`${baseUrl}/user`, indexRouter.userRouter);
app.use(`${baseUrl}/product`, indexRouter.productRouter);
app.use(`${baseUrl}/subCategory`, indexRouter.subcategoryRouter);
app.use(`${baseUrl}/category`, indexRouter.categoryRouter);
app.use(`${baseUrl}/reviews`, indexRouter.reviewsRouter);
app.use(`${baseUrl}/coupon`, indexRouter.couponRouter);
app.use(`${baseUrl}/cart`, indexRouter.cartRouter);
app.use(`${baseUrl}/order`, indexRouter.orderRouter);
app.use(`${baseUrl}/brand`, indexRouter.branRouter);
//in-valid Page
app.use("*", (req, res, next) => {
    res.send("In-valid Routing Plz check url  or method");
});
//errorHandler
app.use(globalErrorHandler)
//connectionDB
connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
