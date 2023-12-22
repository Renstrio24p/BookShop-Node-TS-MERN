import express from 'express'
import { PromiseExpress } from '../types/annotation';
import { Book } from '../models/book.model';

const router = express.Router()

// Routes post all books
router.post('/', async (request, response): PromiseExpress => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error: unknown) {
      console.log((error as Error).message);
      response.status(500).send({ message: (error as Error).message });
    }
  });

// Routes to get All books
router.get('/', async (request, response): PromiseExpress => {
    try {
      const books = await Book.find({});
  
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error: unknown) {
      console.log((error as Error).message);
      response.status(500).send({ message: (error as Error).message });
    }
  });
  

// Routes to get All books by its Id
router.get('/:id', async (request, response): PromiseExpress => {
    try {
      const { id } = request.params;
  
      const book = await Book.findById(id);
  
      return response.status(200).json(book);
    } catch (error: unknown) {
      console.log((error as Error).message);
      response.status(500).send({ message: (error as Error).message });
    }
  });

// Route update a book
router.put('/:id', async (request, response): PromiseExpress => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error: unknown) {
      console.log((error as Error).message);
      response.status(500).send({ message: (error as Error).message });
    }
  });

// Route delete a book
router.delete('/:id', async (request, response): PromiseExpress => {
    try {
      const { id } = request.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error: unknown) {
      console.log((error as Error).message);
      response.status(500).send({ message: (error as Error).message });
    }
  });

export default router;
