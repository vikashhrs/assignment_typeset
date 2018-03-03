var mongoose = require('mongoose');


var ParagraphSchema = mongoose.Schema({
	post_id : {
		type : String,
		required : true
	},

	text : {
		type : String,
		required : true
	},

	comments : [String]
})

module.exports = mongoose.model('Paragraph',ParagraphSchema);