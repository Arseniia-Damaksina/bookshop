-- DROP DATABASE bookStoreFull;

-- CREATE DATABASE bookStoreFull;

USE bookStoreFull;
-- SELECT * FROM books;

-- USE bookStoreFull;
-- SELECT * FROM users;

-- USE bookStoreFull;
-- SELECT * FROM favorites;
-- DROP TABLE favorites;

-- USE bookStoreFull;
-- SELECT `favorite`.*, `book`.*
-- FROM `favorites` AS `favorite`
-- LEFT OUTER JOIN `books` AS `book` ON `favorite`.`book_id` = `book`.`id`
-- WHERE `favorite`.`user_id` = 1;

USE bookStoreFull;
DELETE FROM books WHERE id=5;

-- USE bookStoreFull;
-- INSERT INTO books (title, author, description, price, category, img, user_id) VALUES
-- ('To Kill a Mockingbird', 'Harper Lee', 'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.', 20.00, 'Literary Fiction, Coming-of-age Fiction', 'https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg', 1),
-- ('1984', 'George Orwell', 'A dystopian novel set in a totalitarian society, warning of the dangers of government overreach, totalitarianism, and repressive regimentation of all persons and behaviors within society.', 15.00, 'Dystopian Fiction, Science Fiction', 'https://cdn.kobo.com/book-images/c9472126-7f96-402d-ba57-5ba4c0f4b238/1200/1200/False/nineteen-eighty-four-1984-george.jpg', 2),
-- ('Pride and Prejudice', 'Jane Austen', 'A classic of English literature, the book tells the story of the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.', 17.00, 'Romance, Social Satire', 'https://almabooks.com/wp-content/uploads/2016/10/9781847493699.jpg', 3),
-- ('The Great Gatsby', 'F. Scott Fitzgerald', "An exploration of the American Dream's failure, the novel reveals the disillusionment of the post-World War I generation.", 11.00, 'Jazz Age Fiction, Tragedy', 'https://images.booksense.com/images/722/425/9781609425722.jpg', 1),
-- ('One Hundred Years of Solitude', 'Gabriel García Márquez', 'A landmark of 20th-century literature, the novel tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founds the town of Macondo.', 8.00, 'Magic Realism, Historical Fiction', 'https://m.media-amazon.com/images/I/71IWwBoDNsL._AC_UF894,1000_QL80_.jpg', 2),
-- ('The Lord of the Rings', 'J.R.R. Tolkien', 'An epic high fantasy novel that follows the quest to destroy the One Ring, which was created by the Dark Lord Sauron.', 30.00, 'High Fantasy, Epic Fiction', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg', 3),
-- ('Don Quixote', 'Miguel de Cervantes', 'Widely regarded as the first modern novel, it follows the adventures of an hidalgo named Mr. Alonso Quixano who reads so many chivalric romances that he loses his sanity and decides to set out to revive chivalry and bring justice to the world.', 25.00, 'Satire, Parody, Picaresque', 'https://m.media-amazon.com/images/I/61NlxaWjCYL._AC_UF1000,1000_QL80_.jpg', 1),
-- ('Moby-Dick', 'Herman Melville', "An epic sea-story of Captain Ahab's voyage in pursuit of Moby Dick, a great white whale.", 12.00, 'Adventure Fiction, Sea Story', 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471137235/moby-dick-9781471137235_hr.jpg', 2),
-- ('The Alchemist', 'Paulo Coelho', 'A novel about a young Andalusian shepherd named Santiago, who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried in the Pyramids.', 19.00, 'Fable, Quest, Adventure Fiction', 'https://m.media-amazon.com/images/I/51BBCrLdH6L.jpg', 3),
-- ('The Catcher in the Rye', 'J.D. Salinger', 'The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school.', 14.00, 'Realistic Fiction, Coming-of-age Fiction', 'https://thethinksync.com/wp-content/uploads/2021/09/thecatcherintherye.jpg', 1),
-- ('Brave New World', 'Aldous Huxley', 'A dystopian novel set in a future world state where natural reproduction has been done away with and children are decanted from bottles. It explores the risks of implementing an authoritarian regime.', 21.00, 'Dystopian Fiction, Science Fiction', 'https://ia804707.us.archive.org/BookReader/BookReaderPreview.php?id=bravenewworld0000huxl_u1i2&subPrefix=bravenewworld0000huxl_u1i2&itemPath=/34/items/bravenewworld0000huxl_u1i2&server=ia804707.us.archive.org&page=leaf1&fail=preview&&scale=4&rotate=0', 2),
-- ('The Adventures of Huckleberry Finn', 'Mark Twain', 'The novel is noted for its colorful description of people and places along the Mississippi River.', 16.00, 'Adventure Fiction, Satire', 'https://cdn.kobo.com/book-images/e5009fa4-1fa5-4966-8831-39a94ed28ed6/1200/1200/False/adventures-of-huckleberry-finn-36.jpg', 3);
