var mongoose = require('mongoose');
var Paragraph = require('./paragraphs')

var PostSchema = mongoose.Schema({
	title : {
		type : String,
		required : true
	},
	paragraphs : {
		type : [String],
		required : true
	},
})

module.exports = mongoose.model('Post',PostSchema);

