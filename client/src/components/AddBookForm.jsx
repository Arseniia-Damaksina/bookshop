import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBookForm.css';

import getCookieValue from '../utils/getCookieValue.js';

const AddBookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [img, setImg] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const user_id = parseInt(getCookieValue('id'));

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title,
            author,
            description,
            price,
            category,
            img
        };

        const postAddBook = async () => {
            try {
                const res = await axios.post(
                    `http://localhost:3000/add-book/${user_id}`,
                    data,
                    {
                        withCredentials: true
                    }
                );
                console.log(res)
                if (res.status !== 201) {
                    throw new Error('Error while creating a new user');
                } else {
                    if (res.data.success) {
                        setMessage(res.data.message);
                        // navigate("/")
                    }
                }
            } catch (err) {
                setError(err.message);
            }
        };

        postAddBook();

        setTitle('');
        setAuthor('');
        setDescription('');
        setPrice(0);
        setImg('');
        setCategory('');
    };

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleAuthor = (e) => {
        setAuthor(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleImg = (e) => {
        setImg(e.target.value);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className="form-component">
            <p>{error}</p>
            <p>{message}</p>
            <div className="add-form-container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => handleTitle(e)}
                    />
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={author}
                        onChange={(e) => handleAuthor(e)}
                    />
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => handleDescription(e)}
                    />
                    <label htmlFor="price">Price: </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => handlePrice(e)}
                    />
                    <label htmlFor="img">Image: </label>
                    <input
                        type="text"
                        name="img"
                        id="img"
                        value={img}
                        onChange={(e) => handleImg(e)}
                    />
                    <label htmlFor="category">Shelf: </label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => handleCategory(e)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default AddBookForm;
