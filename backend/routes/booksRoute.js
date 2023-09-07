import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

//Route to save a book
router.post("/", async (req,res)=>{
  try{
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      res.status(400).send({message: 'Send all required fields: title, author, publishYear'})
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    }
    const book = await Book.create(newBook)
    res.status(201).send(book)
  }catch(err){
    console.log(err.message);
    res.status(500).send({message:err.message})
  }
})

//Route to get All books from database
router.get("/", async (req,res)=>{
  try{
    const books = await Book.find({})
    // res.status(200).json(books)
    res.status(200).json({
      count: books.length,
      data: books
    })
  }catch(err){
    console.log(err.message);
    res.status(500).send({message:err.message})
  }
})

//Route to get One books from database by id
router.get("/:id", async (req,res)=>{
  try{
    const {id} = req.params
    const theBook = await Book.findById(id)
    res.status(200).json(theBook)
  }catch(err){
    console.log(err.message);
    res.status(500).send({message:err.message})
  }
})

//Route to Updat a book
router.put("/:id", async (req,res)=>{
  try{
    if(!req.body.title || !req.body.author || !req.body.publishYear){
      res.status(400).send({message: 'Send all required fields: title, author, publishYear'})
    }
    const {id} = req.params
    const result = await Book.findByIdAndUpdate(id, req.body)
    if(!result){
      res.status(404).json({message:"Book not found"})
    }else{
      res.status(200).send({message:"Book updated successfully"})
    }
  }catch(err){
    console.log(err.message);
    res.status(500).send({message:err.message})
  }
})

//Route to Delete a book
router.delete("/:id", async (req,res)=>{
  try{
    const {id} = req.params
    const result = await Book.findByIdAndDelete(id)
    if(!result){
      res.status(404).json({message:"Book not found"})
    }else{
      res.status(200).send({message:"Book Deleted successfully"})
    }
  }catch(err){
    console.log(err.message);
    res.status(500).send({message:err.message})
  }
})


export default router