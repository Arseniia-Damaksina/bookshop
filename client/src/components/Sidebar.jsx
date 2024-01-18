import { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ books, setBooks, currentFilter, onFilterClick }) => {
    // const [showShelves, setShowShelves] = useState(false);

    // const booksForCategories = [...books];
    // const shelves = [
    //     ...new Set(
    //         booksForCategories.flatMap((book) =>
    //             books.category.split(',').map((category) => category.trim())
    //         )
    //     )
    // ];

    // const filterBooksByShelf = (shelf) => {
    //     if (shelf && shelf.trim() !== '') {
    //         const filteredBooks = books.filter((book) =>
    //             book.category.includes(shelf)
    //         );
    //         setBooks(filteredBooks);
    //     }
    // };

    return (
        <div className="sidebarContainer">
            <ul className="sidebarUl">
                <li
                    onClick={() => onFilterClick('all')}
                    style={
                        currentFilter === 'all'
                            ? { backgroundColor: '#B61515', color: 'white' }
                            : null
                    }
                >
                    All Books
                </li>
                <li
                    onClick={() => onFilterClick('myBooks')}
                    style={
                        currentFilter === 'myBooks'
                            ? { backgroundColor: '#B61515', color: 'white' }
                            : null
                    }
                >
                    My Books
                </li>
                <li
                onClick={() => onFilterClick("myFavorites")}
                style={
                  currentFilter === "myFavorites"
                    ? { backgroundColor: "#B61515", color: "white" }
                    : null
                }
                >
                    My Favorites
                </li>
                {/* <li
                    onClick={() => {
                        setShowShelves(!showShelves);
                        onFilterClick('shelves');
                    }}
                    style={
                        currentFilter === 'shelves'
                            ? { backgroundColor: '#B61515', color: 'white' }
                            : null
                    }
                >
                    Shelves
                </li>*/}
            </ul>
            {/* {showShelves && (
                <ul className="shelvesUl">
                    {shelves.map((shelf, index) => (
                        <li
                            key={index}
                            onClick={() => filterBooksByShelf(shelf)}
                        >
                            {shelf}
                        </li>
                    ))}
                </ul>
            )} */}
        </div>
    );
};

export default Sidebar;
