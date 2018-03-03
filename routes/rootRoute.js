let express = require('express');

let router = express.Router();

router.get('/',function(req,res){
	res.status(200).send({message : "Running"});
})

module.exports = router;