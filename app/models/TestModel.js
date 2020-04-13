const mongoose = require("../../config/database.js");

const testSchema = new mongoose.Schema( {
    name: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
        },
    familly: { 
        type: mongoose.SchemaTypes.String, 
        required: true 
        },
});

const collectionName = "test"; // Name of the collection of documents


module.exports = mongoose.model(collectionName, testSchema);