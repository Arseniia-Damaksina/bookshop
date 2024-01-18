import db from '../models/index.js';

const Favorite = db.favorites;
const Book = db.books;

const favoriteContollers = {
    getFavorites: async (req, res) => {
        const { user_id } = req.params;
        try {
            const favorites = await Favorite.findAll({
                where: {
                    user_id
                },
                include: {
                    model: Book,
                    as: 'book'
                }
            });
            if (favorites) {
                return res.status(200).json({ success: true, favorites });
            } else {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: 'No favorite books found'
                    });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: 'Failed to retrieve favorite books'
            });
        }
    },
    addToFavorites: async (req, res) => {
        const { user_id, book_id } = req.params;
        try {
            const favorite = await Favorite.create({ user_id, book_id, liked: true });
            return res.status(200).json({
                success: true,
                message: 'Added to favorites successfully',
                favorite
            });
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, error: 'Failed to add to favorites' });
        }
    },
    removeFromFavorites: async (req, res) => {
        const { user_id, book_id } = req.params;
        try {
            const deletedFavorite = await Favorite.destroy({
                where: { user_id, book_id }
            });
            if (deletedFavorite) {
                return res.status(200).json({
                    success: true,
                    message: 'Removed from favorites successfully'
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, error: 'Favorite book not found' });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: 'Failed to remove from favorites'
            });
        }
    }
};

export default favoriteContollers;
