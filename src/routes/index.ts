import { upload } from "../middlewares";
import { echo, flatten, invert, multiply, sum, test } from "../controllers";
import { Router } from "express";

const router = Router();

router.get('/',  test);

router.post('/echo',upload.single('file'), echo);

router.post('/invert', upload.single('file'), invert);

router.post('/flatten', upload.single('file'), flatten);

router.post('/sum',upload.single('file'), sum);

router.post('/multiply', upload.single('file'), multiply);


export default router;