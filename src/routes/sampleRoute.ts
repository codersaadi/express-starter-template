import { Router } from 'express';
import { sampleController } from '@/controllers/testController';
import { CustomRouter } from '@/types/routes';
import appConfig from '@/main.config';

const router: CustomRouter = Router();

router.mainPath = '/';
router.endpoints = [
  {
    path: '/',
    method: 'get',
    controller: sampleController,
  },
  {
    path: '/',
    method: 'post',
    controller: sampleController,
  },
];
appConfig.registerEndpoints(router);

export default router;
