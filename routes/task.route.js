import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask, updateTaskStatus } from '../controllers/task.contoller.js';


const router = express.Router();

router.post('/create', createTask);

router.get('/all/:userId', getAllTasks);

router.put('/update/:id', updateTask);

router.put('/update-status/:id', updateTaskStatus);

router.delete('/delete/:id', deleteTask);

export default router;
