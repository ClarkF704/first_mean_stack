const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb+srv://clarkf:clarkf@meanstackapplication-uq3xv.mongodb.net/test?retryWrites=true&w=majority', ['tasks']);


// Get all taks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err)
        } 
            res.json(tasks)
    })
})

// Get single tasks

router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)},function(err, task){
        if(err){
            res.send(err)
        } 
            res.json(task)
    })
})

// Hsndle post request

router.post('/task'), function(req, res, next){
    const task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400)
        res.json({
            "error": "bad data"
        })
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err)
            } 
            res.json(task)
        })
    }

}


/// Delete a task

router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectID(req.params.id)},function(err, task){
        if(err){
            res.send(err)
        } 
            res.json(task)
    })
})

// Update task

router.put('/task/:id', function(req, res, next){
    const task = req.body;
    const updTask = {};
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    if(task.title){
        updTask.title = task.isDone;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad data"
        })
    } else {
        db.tasks.update({_id: mongojs.ObjectID(req.params.id)},updTask,{},function(err, task){
            if(err){
                res.send(err)
            } 
                res.json(task)
        })
    }
   
})


module.exports = router;