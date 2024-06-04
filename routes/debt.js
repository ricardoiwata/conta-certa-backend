const express = require("express");
const auth = require("../middleware/auth");
const Debt = require("../models/Debt");

const router = express.Router();

router.post("/registerDebt", auth, async (req, res) => {
  const { name, value, dueDate, numberOfInstallments, interestRate } = req.body;

  try {
    const newDebt = new Debt({
      user: req.user.id,
      name,
      value,
      dueDate,
      numberOfInstallments,
      interestRate,
    });

    const debt = await newDebt.save();
    res.json(debt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const debts = await Debt.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.json(debts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const debt = await Debt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(debt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Debt.findByIdAndDelete(req.params.id);
    res.json({ msg: "Dívida deletada" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
