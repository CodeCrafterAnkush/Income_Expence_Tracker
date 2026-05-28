import inconesModel from "../models/income.model.js";
import XLSX from "xlsx";
import getDateRange from "../utils/dataFilter.js";

export async function addIncome(req, res) {
  const userId = req.user._id;

  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const newincones = new inconesModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });
    await newincones.save();
    res.json({
      success: true,
      message: "incones added successfully.",
    });
  } catch (error) {
    console.error("Error in adding incones:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
}

// get incones (all)

export async function getAllIncomes(req, res) {
  const userId = req.user._id;

  try {
    const incones = await inconesModel.find({ userId }).sort({ date: -1 });
    res.json(incones);
  } catch (error) {
    console.error("Error in fetching inconess:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
}

export async function updateIncome(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  const { description, amount } = req.body;
  try {
    const updatedincones = await inconesModel.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      { description, amount },
      { new: true },
    );
    if (!updatedincones) {
      return res.status(404).json({
        success: false,
        message: "incones not found.",
      });
    }
    res.json({
      success: true,
      message: "incones updated successfully.",
      data: updatedincones,
    });
  } catch (error) {
    console.error("Error in updating incones:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
}

// delete incones
export async function deleteIncome(req, res) {
  try {
    const incones = await inconesModel.findOneAndDelete({ _id: req.params.id });
    if (!incones) {
      return res.status(404).json({
        success: false,
        message: "incones not found.",
      });
    }
    return res.json({
      success: true,
      message: "incones deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleting incones:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
}

//to download the data in exxcel sheet
export async function downloadIncomeExcel(req, res) {
  const userId = req.user._id;
  try {
    const incones = await inconesModel.find({ userId }).sort({ date: -1 });
    const plainData = incones.map((inc) => ({
      Description: inc.description,
      Amount: inc.amount,
      Category: inc.category,
      Date: new Date(inc.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "inconesModel");
    XLSX.writeFile(workbook, "incones_details.xlsx");
    res.download("incones_details.xlsx");
  } catch (error) {
    console.error("Error in downloading incones data:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
}

// incones overview
export async function getIncomeOverview(req, res) {
  try {
    const userId = req.user._id;
    const { range = "monthly" } = req.query;
    const { start, end } = getDateRange(range);

    const incones = await inconesModel
      .find({
        userId,
        date: { $gte: start, $lte: end },
      })
      .sort({ date: -1 });

    const totalincones = inconess.reduce((acc, cur) => acc + cur.amount, 0);
    const averageincones = inconess.length > 0 ? totalincones / inconess.length : 0;
    const numberOfTransactions = inconess.length;

    const recentTransactions = inconess.slice(0, 9);

    res.json({
      success: true,
      data: {
        totalincones,
        averageincones,
        numberOfTransactions,
        recentTransactions,
        range,
      },
    });
  } catch (error) {
    console.error("Error in fetching incones overview:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
}
