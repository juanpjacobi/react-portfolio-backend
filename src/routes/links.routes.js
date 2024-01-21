import express from 'express';
import { createLink, getLinks, getLink, updateLink, deleteLink } from '../controllers/link.controller.js';

const router = express.Router();


router.get('/links', getLinks);
router.post('/links', createLink);
router.get('/links/:id', getLink);
router.put('/links/:id', updateLink);
router.delete('/links/:id', deleteLink);


export default router;

