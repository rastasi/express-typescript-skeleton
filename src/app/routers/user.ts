import * as express from 'express';
import controller from '../controllers/user';
const router = express.Router({ mergeParams: true });

router.use(controller.authorization);
router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export {
  router
};