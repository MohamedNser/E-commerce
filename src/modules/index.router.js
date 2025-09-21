import express from "express";
import authRouter from "./auth/auth.router.js";
import branRouter from "./brand/brand.router.js";
import cartRouter from "./cart/cart.router.js";
import categoryRouter from "./category/category.router.js";
import couponRouter from "./coupon/coupon.router.js";
import orderRouter from "./order/order.router.js";
import productRouter from "./product/product.router.js";
import reviewsRouter from "./reviews/reviews.router.js";
import subcategoryRouter from "./subcategory/subcategory.router.js";
import userRouter from "./user/user.router.js";
import { globalErrorHandler } from "../services/errorHandling.js";
import connectDB from "../../DB/connection.js";
import morgan from "morgan";

export const appRouter = (app) => {
  //convert Buffer Data
  app.use(express.json());
  if (process.env.MOOD) {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }
  //baseUrl
  const baseUrl = process.env.BASEURL;
  //Setup API Routing
  app.use(`${baseUrl}/auth`, authRouter);
  app.use(`${baseUrl}/user`, userRouter);
  app.use(`${baseUrl}/product`, productRouter);
  app.use(`${baseUrl}/subCategory`, subcategoryRouter);
  app.use(`${baseUrl}/category`, categoryRouter);
  app.use(`${baseUrl}/reviews`, reviewsRouter);
  app.use(`${baseUrl}/coupon`, couponRouter);
  app.use(`${baseUrl}/cart`, cartRouter);
  app.use(`${baseUrl}/order`, orderRouter);
  app.use(`${baseUrl}/brand`, branRouter);
  //in-valid Page
  app.use("*", (req, res, next) => {
    res.send("In-valid Routing Plz check url  or method");
  });
  //errorHandler
  app.use(globalErrorHandler);
  //connectionDB
  connectDB();
};
