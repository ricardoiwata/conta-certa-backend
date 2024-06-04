const express = require("express");
const auth = require("../middleware/auth");
const Income = require("../models/Income");

const router = express.Router();

router.post("/registerIncome", auth, async (req, res) => {
  const { name, value, date, recurring } = req.body;

  try {
    const newIncome = new Income({
      user: req.user.id,
      name,
      value,
      date,
      recurring,
    });

    const income = await newIncome.save();
    res.json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ msg: "Renda deletada" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
