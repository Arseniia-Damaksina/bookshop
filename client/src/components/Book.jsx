import './Book.css';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import './Book.css';
import getCookieValue from '../utils/getCookieValue.js';

const Book = ({ book, onDelete, currentFilter, books, setBooks }) => {
    const [liked, setLiked] = useState(false);

    const navigate = useNavigate();

    const user_id = Number(getCookieValue('id'));

    const handleEdit = () => {
        navigate(`/edit/${book.id}`);
    };

    const handleAddToFavorites = async () => {
        try {
            const res = await axios.post(
                `http://localhost:3000/add-to-favorites/${user_id}/${book.id}`,
                {
                    withCredentials: true
                }
            );
            console.log(res);
            if (res.status !== 200) {
                throw new Error('Error while adding to favorites');
            } else {
                if (res.data.success) {
                    console.log(res.data.message);
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleRemoveFromFavorites = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:3000/remove-from-favorites/${user_id}/${book.id}`,
                {
                    withCredentials: true
                }
            );
            console.log(res);
            if (res.status !== 200) {
                throw new Error('Error while removing from favorites');
            } else {
                if (res.data.success) {
                    setLiked(false);
                    if (currentFilter === 'myFavorites') {
                        setBooks(books.filter((item) => item.id !== book.id)); // Remove the unliked book from the books array
                    }
                    console.log(res.data.message);
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleHeartClick = () => {
        setLiked(!liked);
        if (!liked) {
            handleAddToFavorites();
        } else {
            handleRemoveFromFavorites();
        }
    };

    useEffect(() => {
        const fetchLikedStatus = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/get-favorites/${user_id}`
                );
                const matchedFavorite = response.data.favorites.find(
                    (favorite) =>
                        favorite.book_id === book.id &&
                        favorite.user_id === user_id
                );

                if (matchedFavorite) {
                    setLiked(matchedFavorite.liked);
                }
            } catch (error) {
                console.error(
                    'Error occurred while fetching liked status:',
                    error
                );
            }
        };
        fetchLikedStatus();
    }, [user_id, book.id]);

    return (
        <div className="book-container">
            <img src={book.img} alt={book.title} />
            <div className="book-info">
                <div className="book-text">
                    <div>
                        <h2>{book.title}</h2>
                        <h3>{book.author}</h3>
                        <div className="price">
                            {book.price.toString().replace(/\.0+$/, '')}$
                        </div>
                    </div>

                    <div className="iconsDiv">
                        {currentFilter === 'myBooks' ? (
                            <div>
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    style={{
                                        color: '#b61515',
                                        fontSize: '20px',
                                        margin: '10px 5px'
                                    }}
                                    onClick={handleEdit}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{
                                        color: '#b61515',
                                        fontSize: '20px',
                                        margin: '10px 5px'
                                    }}
                                    onClick={onDelete}
                                />
                            </div>
                        ) : (
                            ''
                        )}
                        {user_id ? (
                            <FontAwesomeIcon
                                icon={faHeart}
                                style={{
                                    color: liked ? '#b61515' : '#000000',
                                    fontSize: '36px',
                                    margin: '9px 5px'
                                }}
                                onClick={handleHeartClick}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div>{book.category}</div>
            </div>
            <button>Buy now</button>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.shape({
        category: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        user_id: PropTypes.number.isRequired
    })
};

export default Book;
