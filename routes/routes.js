import { Router } from "../deps.js";
import { showTasks } from "./controllers/trackingController.js";
import * as trackingApi from "./apis/trackingApi.js";

const router = new Router();

router.get('/', showTasks);

router.post('/tasks', trackingApi.addTask);
router.post('/tasks/:id/start', trackingApi.startTask);
router.post('/tasks/:id/complete', trackingApi.completeTask);

router.get('/average', trackingApi.getAverage);

// router.get('/api/hello', helloApi.getTasks);
// router.post('/api/hello', helloApi.addTask);
// router.get('/', main);


export { router };
