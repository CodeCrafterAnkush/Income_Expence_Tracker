import incomeModel from "../models/incomeModel.js";
import incomeModel from "../models/incomeModel.js";
import XLSX from "xlsx";


export async function addIncome(req,res) {
    const userId = req.user._id;

    const {description, amount, category, date} = req.body;

    try {
        if(!description || !amount || !category || !date){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        const incomeModel = new incomeModel({
            userId,
            description,
            amount,
            category,
            date:new Date(date),
        })
        await newIncome.save();
        res.json({
            success:true,
            message:"Income added successfully.",
        })
    } catch (error) {
        console.error("Error in adding income:", error);
        return res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
}

// get Income (all)

export async function getAllIncomes(req,res) {
 const userId = req.user._id;

 try {
    const income = await incomeModel.find({userId}).sort({date :-1});
    res.json(income);               
 } catch (error) {
    console.error("Error in fetching incomes:", error);
    return res.status(500).json({
        success:false,
        message:"Server Error."
    });
 }
}

export async function updateIncome(req,res) {
    const {id} = req.params;
    const userId = req.user._id;
    const {description,amount} = req.body;
    try {
        const updatedIncome = await incomeModel.findOneAndUpdate({
            _id:id,userId
        },{description, amount},{new:true});
        if(!updatedIncome){
            return res.status(404).json({
                success:false,
                message:"Income not found."
            })
        }
        res.json({
            success:true,
            message:"Income updated successfully.",
            data:updatedIncome
        })
    } catch (error) {
        console.error("Error in updating income:", error);
        return res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
}

// delete income
export async function deleteIncome(req,res) {
    try {
        const income = await incomeModel.findOneAndDelete({_id: req.params.id, });
    if(!income){
        return res.status(404).json({
            success:false,
            message:"Income not found."
        })
    }
    return res.json({
        success:true,
        message:"Income deleted successfully."
    })
    } catch (error) {
        console.error("Error in deleting income:", error);
        return res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
}

//to download the data in exxcel sheet
export async function downloadIncomeExcel(req,res) {
    const userId = req.user._id;
    try {
        const income = await incomeModel.find({userId}).sort({date:-1});
        const plainData = income.map((inc) => ({
            Description : inc.description,
            Amount : inc.amount,
            Category : inc.category,
            Date : new Date(inc.date).toLocaleDateString(),
        }));

        const worksheet = XLSX;
    } catch (error) {
        
    }
}