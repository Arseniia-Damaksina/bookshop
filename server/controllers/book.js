import db from '../models/index.js';

const Book = db.books;

const bookContollers = {
    getBooks: async (req, res) => {
        try {
            const books = await Book.findAll();
            return res.status(200).json({ sucess: true, books });
        } catch (err) {
            return res
                .status(500)
                .json({ sucess: false, err: 'Failed to retrieve books' });
        }
    },
    getBook: async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Book.findByPk(id);
            if (book) {
                return res.status(200).json({ success: true, book });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: 'Failed to retrieve the book'
            });
        }
    },
    getBooksByUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            const books = await Book.findAll({ where: { user_id } });

            if (books) {
                return res.status(200).json({ success: true, books });
            } else {
                return res.status(404).json({
                    success: false,
                    books: [],
                    err: 'No books found for this user'
                });
            }
        } catch (err) {
            return res
                .status(500)
                .json({
                    success: false,
                    err: "Failed to retrieve user's books"
                });
        }
    },
    addBook: async (req, res) => {
        try {
            const { user_id } = req.params;
            const { title, author, description, price, category, img } = req.body;

            // Check
            if (!title || !price || !category ) {
                return res.status(400).json({
                    success: false,
                    err: 'Please fill in the required fields'
                });
            }
            const newBook = await Book.create({
                title,
                author,
                description,
                price,
                category,
                img,
                user_id
            });
            return res.status(201).json({ success: true, message: "A new book is added successfully", newBook });
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, err: 'Failed to add a book' });
        }
    },
    updateBook: async (req, res) => {
        try {
            const { id } = req.params;
            const [updatedCount] = await Book.update(req.body, {
                where: { id: id }
            });

            if (updatedCount === 0) {
                return res.status(404).json({
                    success: false,
                    err: 'Book is not found for update'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Book updated successfully'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: 'Failed to update a book'
            });
        }
        // const { id } = req.params;
        // const bookToUpdate = await Book.findOne({ where: { id: id } });
        // if (bookToUpdate) {
        //
        //     res.status(200).send({
        //         message: `The book with id ${id} is updated`
        //     });
        // } else {
        //     res.status(404).send({
        //         message: `The book with id ${id} does not exist`
        //     });
        // }
    },
    deleteBook: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCount = await Book.destroy({
                where: { id }
            });

            if (deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    err: 'Book is not found for deletion'
                });
            }
            return res.status(200).json({
                success: true,
                message: `Book with id: ${id} is deleted successfully`
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: 'Failed to delete a book'
            });
        }
        // const { id } = req.params;

        // const bookToDelete = await Book.findOne({ where: { id: id } });
        // if (bookToDelete) {
        //     await Book.destroy({ where: { id: id } });
        //     res.status(200).send({
        //         message: `The book with id ${id} is deleted`
        //     });
        // } else {
        //     res.status(404).send({
        //         message: `The book with id ${id} does not exist`
        //     });
        // }
    }
};

export default bookContollers;
