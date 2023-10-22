const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const ConnectDB = require("./database/db.js");
const Shift = require("./model/shift-model.js");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

ConnectDB();

app.get("/api/get-shifts", async (req, res) => {
  try {
    const shifts = await Shift.find({});
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/add-shift", async (req, res) => {
  try {
    console.log(req.body);
    const { from, to, shiftTitle } = req.body;
    const id = uuidv4().substring(0, 4);
    const shift = new Shift({ id, from, to, shiftTitle });
    await shift.save();
    res.status(200).send("new shift added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/remove-shift", async (req, res) => {
  try {
    const { id } = req.body;
    await Shift.deleteOne({ id: id });
    res.status(200).send(`removed shift with id: ${id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
