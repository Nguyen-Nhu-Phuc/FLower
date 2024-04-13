import express from 'express';
import multer from 'multer';
import forecast from '../controllers/forecast.controller.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload', upload.single('image'), forecast.prepare_input);

export default router;
