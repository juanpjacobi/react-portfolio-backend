import express from 'express';
import { createSkill, deleteSkill, getSkill, getSkills, updateSkill } from '../controllers/skill.controller.js';

const router = express.Router();

router.get('/skills', getSkills);
router.get('/skills/:id', getSkill);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

export default router;

