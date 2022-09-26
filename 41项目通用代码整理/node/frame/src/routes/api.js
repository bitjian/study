import express from 'express';
import jwt from '../middlewares/jwt';


export default function api(appPath) {
  const router = express.Router();
  router.use(jwt().unless({
    path: [
      `${appPath}/api/auth/login`,
      `${appPath}/api/auth/logout`,
      `${appPath}/api/auth/vCode`,
    ]
  }));
  router.post('/taf', tafPerm(), homeController.post);
  return router;
}