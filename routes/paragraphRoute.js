let express = require('express');
let Post = require('./../models/posts');
let Paragraph = require('./../models/paragraphs')

let mongoose = require('mongoose');

let ObjectId = mongoose.Types.ObjectId;

let router = express.Router();

router.post('/app/add/comment/:paragraphId',function(req,res){
	
	let paragraph_Id = new ObjectId(req.params.paragraphId);
	
	Paragraph.findOne({_id : paragraph_Id},function(err,paragraph){
		if(err){

			res.status(500).send({data : "Server Error"});

		}else if(paragraph){

			paragraph.comments.push(req.body.comment);

			paragraph.save(function(err,updatedParagraph){

				if(err){

					res.status(500).send({data : "Server Error"});

				}else {

					res.status(200).send(updatedParagraph);

				}

			});
		}else{

			res.status(204).send({data : "No such paragraph exists"});

		}

		
	})

})

router.get('/app/get/paragraphs/:postId',function(req,res){
	
	let post_id = new ObjectId(req.params.postId);

	Paragraph.find({post_id : post_id},function(err,paragraphs){
		if(err){

			res.status(500).send({data : "Server Error"});

		}else if(paragraphs){

			res.status(200).send(paragraphs);

		}else{

			res.status(204).send({data : "No such post exists"});

		}
		
	})
});

module.exports = router;