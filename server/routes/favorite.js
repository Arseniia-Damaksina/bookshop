import { Router } from "express";

import favoriteControllers from "../controllers/favorite.js";
// import verifyToken from '../middleware/verifyToken.js';

const favoriteRouter = Router();

favoriteRouter.get("/get-favorites/:user_id", favoriteControllers.getFavorites); 
favoriteRouter.post("/add-to-favorites/:user_id/:book_id", favoriteControllers.addToFavorites);
favoriteRouter.delete("/remove-from-favorites/:user_id/:book_id", favoriteControllers.removeFromFavorites);

export default favoriteRouter;
