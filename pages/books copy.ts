import Book from '../models/book';
import Author from '../models/author';
import BookInstance from '../models/bookinstance';
import express from 'express';

const router = express.Router();

/**
 * @route GET /book_dtls
 * @group resource - the details of a book
 * @param {string} id.query - the book id
 */
router.get('/', async (req, res) => {
  const id = req.query.id;
  try {
    const [book, details] = await Promise.all([
      Book.getBook(id as string),
      BookInstance.getBookDetails(id as string)
    ]);

    if (!book) {
      res.status(404).send(`Book ${id} not found`);
      return;
    }

    res.send({
      title: book.title,
      author: book.author.name,
      copies: details
    });

  } catch {
    // res.send('No book details found');
    res.status(500).send(`Error fetching book details ${id}`);
  }
});

export default router;
