import { Router } from 'express';
import LangController from './controllers/LangController.js';
import TranslateController from './controllers/TranslateController.js';

export const router = Router();

router.get('/langs', LangController.index);
router.get('/langs/:code', LangController.show);
router.post('/translate', TranslateController.translate);
