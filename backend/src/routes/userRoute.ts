// userRoutes.ts
import express from 'express';
import { createComment, createRecipe, getUserProfile, getUserRecipes } from '../controllers/userController';
const router = express.Router();
import authenticateUser from '../middleware/authenticateUser';

router.use(authenticateUser)
router.get('/profile', getUserProfile);
router.get('/getRecipies', getUserRecipes);
router.post('/createRecipe', createRecipe);
router.post('/createComment', createComment);


export default router;
