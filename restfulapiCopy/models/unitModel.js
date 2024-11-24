const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
  name: { type: String, required: true }
},{ collection: 'units', timestamps: true });

const Unit = mongoose.model('Unit', UnitSchema);

module.exports = Unit;
