import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  patchProduct
} from '../controllers/product';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', patchProduct);

export default router;
