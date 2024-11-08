import express from 'express';
import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} from '../../controllers/thoughtController.js';

const router = express.Router();

router.get('/thoughts', getAllThoughts);
router.get('/thoughts/:id', getThoughtById);
router.post('/thoughts', createThought);
router.put('/thoughts/:id', updateThought);
router.delete('/thoughts/:id', deleteThought);
router.post('/thoughts/:thoughtId/reactions', addReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
