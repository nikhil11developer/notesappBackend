const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');
const { findByIdAndUpdate } = require('../models/Notes');


router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 5 })

], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.status(200).json(notes)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
})


router.post('/updatenote/:id' , fetchuser , async (req , res)=>{
    const {title , description , tag}=req.body;
    //create the new note object
    const newNote={}
    if(title){newNote.title=title;}
    if(description){newNote.description=descripotion;}
    if(tag){newNote.tag=tag;}

    //find the note to be updated 
    let note=await Note.findById(req.params.id)

    //give error message if the note with id does not exists
    if(!note) {return res.status(404).json({message:'The note has not been found'})}

    //give error message if the owner of the note is not equal to the current logged in user
    if(note.user.toString()!=req.user.id)
            return res.status(401).json({message:'Not allowed'})

    note = findByIdAndUpdate(req.params.id , {$set: newNote} , {new: true})
    res.status(200).json(note)        

})

module.exports = router
