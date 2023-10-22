const mongoose = require("mongoose");

const shiftSchema = mongoose.Schema({
  id: String,
  shiftTitle: String,
  from: String,
  to: String,
});

const Shift = mongoose.model("shift", shiftSchema);

module.exports = Shift;
