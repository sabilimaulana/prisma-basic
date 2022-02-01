import { Router } from 'express';
import {
  addCategory,
  deleteCategory,
  getCategory,
  getCategories,
  patchCategory
} from '../controllers/category';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', addCategory);
router.delete('/:id', deleteCategory);
router.patch('/:id', patchCategory);

export default router;
