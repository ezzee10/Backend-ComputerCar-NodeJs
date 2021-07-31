const express = require("express");
const conectarDB = require("./config/db");
const startCron = require("./cronjob/cronjob");
const cors = require("cors");

const app = express();

app.use(cors());

conectarDB();

app.use(express.json({ extended: true }));

const port = process.env.port || 4000;

app.use("/api/driver", require("./routes/driver"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/travel", require("./routes/travel"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/vehicle", require("./routes/vehicle"));
// app.use("/api/email", require("./routes/email"));

startCron();

app.listen(port, () => {
  console.log(`El server está funcionando en el puerto ${port}`);
});
