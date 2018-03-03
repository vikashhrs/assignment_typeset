let express = require('express');
let Post = require('./../models/posts');
let Paragraph = require('./../models/paragraphs')
let router = express.Router();


router.post("/app/save/post",function(req,res){

	let postData = req.body;

	let post = new Post({
		title : postData.title,
		paragraphs : postData.body.split("\n\n")
	})

	let postSavePromise = post.save();

	postSavePromise.then(function(savedPost){

		let post_id = savedPost._id;
		let arrayOfPromises = []
		let paragraphArray = savedPost.paragraphs;
		
		paragraphArray.forEach(function(paragraphText){
			
			let paragraphObject = new Paragraph({
				post_id : post_id,
				text : paragraphText,
				comments : []
			})

			let promise = paragraphObject.save();
			arrayOfPromises.push(promise);

		})

		Promise.all(arrayOfPromises).then(function(data){

			res.status(200).send(savedPost);

		}).catch(function(err){


			res.status(500).send({data : "Server Error"});

		})
		
	}).catch(function(err){

		res.status(500).send({data : "Server Error"});

	})
});


router.get('/app/paginate/posts/:offset',function(req,res){

	let offset = parseInt(req.params.offset);
	offset = offset - 1;
	let dataFrom = {
		limit : 5
	};
	if(offset >= 0 ){

		dataFrom.skip = 5*offset;

		Post.find(null,null,dataFrom,function(err,posts){

			if(err){

				res.status(500).send({data : "Server Error"});

			}else if(posts.length > 0){

				res.status(200).send(posts);
				

			}else{

				res.status(204).send({data : "No posts made yet"});

			}
		});


	}else{

		res.status(400).send({message : "Offset cannot be 0"});

	}
});

router.get('/app/get/total/posts',function(req,res){
	Post.count(null,function(err,totalCount){
		if(err){

			res.status(500).send({data : "Server Error"});

		}else{

			res.status(200).send({totalCount : totalCount});
		}
	})
})

module.exports = router;