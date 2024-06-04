const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const incomesRoutes = require("./routes/incomes");
const expensesRoutes = require("./routes/expenses"); // Certifique-se de importar suas rotas de usuário
const debtsRoutes = require("./routes/debt");
const { mongoURI } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB", err));

app.use("/api", authRoutes);
app.use("/api/user", userRoutes); // Usar as rotas de usuário
app.use("/api/incomes", incomesRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/debts", debtsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const cron = require("node-cron");
const Income = require("./models/Income");
const Expense = require("./models/Expense"); // Certifique-se de ter o modelo de gastos configurado corretamente

// Agendar a tarefa para rodar no dia 5 de cada mês à meia-noite
cron.schedule("0 0 5 * *", async () => {
  try {
    // Zerar todos os gastos
    await Expense.deleteMany({});
    console.log("Todos os gastos foram zerados.");

    // Zerar todas as rendas não recorrentes
    await Income.deleteMany({ recurring: false });
    console.log("Todas as rendas não recorrentes foram zeradas.");
  } catch (err) {
    console.error("Erro ao zerar rendas e gastos:", err);
  }
});

// cron.schedule("* * * * *", async () => {
//     try {
//       await Expense.deleteMany({});
//       console.log("Todos os gastos foram zerados.");
//       await Income.deleteMany({ recurring: false });
//       console.log("Todas as rendas não recorrentes foram zeradas.");
//     } catch (err) {
//       console.error("Erro ao zerar rendas e gastos:", err);
//     }
// });
