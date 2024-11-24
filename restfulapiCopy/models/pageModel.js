const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    data: { type: Object },
    //unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
},{ collection: 'pages', timestamps: true });

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;

