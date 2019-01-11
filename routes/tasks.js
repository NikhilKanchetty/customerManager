var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://localhost:27017/toDoApp', ['myLists']);

// get all tasks
router.get('/tasks', function(req,res,next){
db.myLists.find( function(err, myLists){
    if(err){
        res.send(err);
    }
    res.json(myLists);
});
});

//get single tasks
router.get('/tasks/:id', function(req,res,next){
db.myLists.findOne({_id: mongojs.ObjectID(req.params.id)}, function(err, myLists){
    if(err){
        res.send(err);
    }
    res.json(myLists);
});
});

//save task
router.post('/task', function(req, res, next){
    var temp = req.body;
    if(!temp.title || temp.isdone + ''){
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.myLists.save(temp, function(err, temp){
            if(err){
                res.send(err);
            }
            res.json(temp);
        });
    }
});

//delete single tasks
router.delete('/tasks/:id', function(req,res,next){
db.myLists.remove({_id: mongojs.ObjectID(req.params.id)}, function(err, myLists){
    if(err){
        res.send(err);
    }
    res.json(myLists);
});
});

//update single task 
router.put('/tasks/:id', function(req,res,next){
    var temp = req.body;
    var updTask = {};

    if(temp.isdone){
        updTask.isdone = temp.isdone;
    }

    if(temp.title){
        updTask.tilte = temp.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.myLists.remove({_id: mongojs.ObjectID(req.params.id)},updTask,{}, function(err, myLists){
            if(err){
                res.send(err);
            }
            res.json(myLists);
        });
    }
    
});

module.exports = router;  