const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req,res)=>{
    try{
        const data = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(data)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//get a single workout
const getSpecificWorkout = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout found"})
    }

    const data = await Workout.findById(id)
    
    if(!data){
        return res.status(404).json({error: "No workout found"})
    }
    res.status(200).json(data)
}


//create new workout
const createWorkout = async (req,res) =>{
    const {title,reps,load} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    try{
        const data = await Workout.create({title,reps,load})
        res.status(200).json(data)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No workout found"})
    }

    const data = await Workout.findOneAndDelete({_id:id})

    if(!data){
        res.status(400).json({error: "No workout found"})
    }
    res.status(200).json(data)
}


//update a workout
const updateWorkout = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No workout found"})
    }

    const data = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!data){
        res.status(400).json({error: "No workout found"})
    }
    res.status(200).json(data)
}



module.exports = {
    createWorkout,
    getWorkouts,
    getSpecificWorkout,
    deleteWorkout,
    updateWorkout
}