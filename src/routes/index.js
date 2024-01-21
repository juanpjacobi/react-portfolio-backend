import express from 'express';
import skillRoutes from './skills.routes.js';
import projectRoutes from './projects.routes.js';
import linkRoutes from './links.routes.js';
import imageRoutes from './images.routes.js';




const router = express.Router();

router.use(skillRoutes);
router.use(projectRoutes);
router.use(linkRoutes);
router.use(imageRoutes);





export default router;