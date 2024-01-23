import express from 'express';
import { createImage, deleteImage, getImage, getImages, updateImage } from '../controllers/image.controller.js';

const router = express.Router();


router.get('/images', getImages);
router.post('/images', createImage);
router.get('/images/:id', getImage);
router.put('/images/:id', updateImage);
router.delete('/images/:id', deleteImage);


export default router;

