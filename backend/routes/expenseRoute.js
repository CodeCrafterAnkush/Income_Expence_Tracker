import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addExpense, deleteExpense, doenloadExpenseExcel, getAllExpenses, getExpenseOverview, updateExpense } from "../controllers/expenseControler.js";


const expenseRouter = express.Router();

expenseRouter.post("/add", authMiddleware, addExpense);
expenseRouter.get("/get", authMiddleware, getAllExpenses);

expenseRouter.put("/update/:id", authMiddleware, updateExpense);
expenseRouter.get("/downloadexcel", authMiddleware, doenloadExpenseExcel);

expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRouter.get("/overview", authMiddleware, getExpenseOverview);

export default expenseRouter;