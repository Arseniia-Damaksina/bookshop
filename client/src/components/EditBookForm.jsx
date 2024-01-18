import './EditBookForm.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditBookForm = () => {
  const [bookToUpdate, setBookToUpdate] = useState({});
  const id = useParams().id;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
      const getProductToUpdate = async (id) => {
          try {
              const res = await axios.get(`http://localhost:3000/book/${id}`);
              if (res.status !== 200) {
                  throw new Error(
                      `Failed to fetch data with status: ${res.status}`
                  );
              } else {
                  const bookData = res.data.book;
                  setBookToUpdate(bookData);
                  setTitle(bookData.title);
                  setAuthor(bookData.author);
                  setDescription(bookData.description);
                  setPrice(bookData.price);
                  setCategory(bookData.category);
                  setImg(bookData.img);
              }
          } catch (err) {
              console.log(err.message);
          }
      };

      getProductToUpdate(id);
  }, [id]);

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

        const editBook = async (id) => {
            try {
                const res = await axios.put(
                    `http://localhost:3000/update/${id}`,
                    data,
                    {
                        withCredentials: true
                    }
                );
                console.log(res);
                if (res.status !== 200) {
                    throw new Error('Error while updating the book');
                } else {
                    if (res.data.success) {
                        setMessage(res.data.message);
                        setError('')
                        // navigate("/")
                    }
                }
            } catch (err) {
                setError(err.message);
                setMessage('')
            }
        };

        editBook(id);

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

export default EditBookForm;
