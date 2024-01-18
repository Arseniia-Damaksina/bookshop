import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowDownAZ, faStar } from "@fortawesome/free-solid-svg-icons";

import './BookstorePage.css';
import getCookieValue from '../utils/getCookieValue.js';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Book from '../components/Book';

const BookstorePage = () => {
    const [books, setBooks] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('all');

    useEffect(() => {
        const getBooks = async () => {
            try {
                const user_id = Number(getCookieValue('id'));
                let res;
                if (currentFilter === 'myBooks') {
                    res = await axios.get(
                        `http://localhost:3000/get-user-books/${user_id}`
                    );
                    console.log(res);
                    setBooks(res.data.books);
                } else if (currentFilter === 'all') {
                    res = await axios.get('http://localhost:3000/');
                    setBooks(res.data.books);
                } else if (currentFilter === 'myFavorites') {
                    res = await axios.get(
                        `http://localhost:3000/get-favorites/${user_id}`
                    );
                    const bookArray = res.data.favorites.map((item) => item.book);
                    setBooks(bookArray);
                }

                if (res.status !== 200) {
                    throw new Error(
                        `Failed to fetch data with status: ${res.status}`
                    );
                }
            } catch (err) {
                console.log(err);
            }
        };

        getBooks();
    }, [currentFilter]);

    const handleDelete = async (bookId, userId) => {
        try {
            const currentId = Number(getCookieValue('id'));
            if (currentId === userId) {
                const res = await axios.delete(
                    `http://localhost:3000/delete/${bookId}`,
                    {
                        withCredentials: true
                    }
                );
                if (res.status === 200) {
                    setBooks(books.filter((book) => book.id !== bookId));
                } else {
                    throw new Error(
                        `Failed to delete product with status: ${res.status}`
                    );
                }
            } else {
                throw new Error(`You are not authorised to delete this book!`);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="mainContainer">
            <Header />
            <div className="content">
                <Sidebar
                    books={books}
                    setBooks={setBooks}
                    currentFilter={currentFilter}
                    onFilterClick={(filter) => setCurrentFilter(filter)}
                />
                <div className="books">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <Book
                                key={book.id}
                                book={book}
                                books={books}
                                setBooks={setBooks}
                                onDelete={() =>
                                    handleDelete(book.id, book.user_id)
                                }
                                currentFilter={currentFilter}
                            />
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookstorePage;
