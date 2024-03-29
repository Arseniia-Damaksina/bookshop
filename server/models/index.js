import { Sequelize, DataTypes } from 'sequelize';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import createBook from './book.js';
import createUser from './user.js';
import createFavorite from './favorite.js';

// construct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// path configuration
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        // operatorsAliases: false,
        // dialectOptions: {
        //     socketPath: '/tmp/mysql.sock'
        // },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = createBook(sequelize, DataTypes);
db.users = createUser(sequelize, DataTypes);
db.favorites = createFavorite(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log('yes re-sync done!');
});

// 1 to Many relations
db.users.hasMany(db.books, {
    foreignKey: 'user_id',
    as: 'book'
});

db.books.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user'
});

// Many-to-many relations
db.users.belongsToMany(db.books, {
    through: db.favorites,
    foreignKey: 'user_id'
});
db.books.belongsToMany(db.users, {
    through: db.favorites,
    foreignKey: 'book_id'
});

// Favorites belong to books
db.favorites.belongsTo(db.books, {
    foreignKey: 'book_id',
    as: 'book'
});


export default db;
