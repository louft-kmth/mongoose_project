const mongoose = require("mongoose");
const schema = mongoose.Schema({
	titel: String,
	content: String,
});

module.exports = mongoose.model("post", schema);
