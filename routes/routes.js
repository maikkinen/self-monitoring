import { Router } from "../deps.js";
import { showTasks, showMorningForm, showEveningForm } from "./controllers/trackingController.js";
import * as trackingApi from "./apis/trackingApi.js";

const router = new Router();

router.get('/', showTasks);

router.get('/morning', showMorningForm);
router.get('/evening', showEveningForm);


router.post('/tasks', trackingApi.addTask);
router.post('/tasks/:id/start', trackingApi.startTask);
router.post('/tasks/:id/complete', trackingApi.completeTask);

router.get('/average', trackingApi.getAverage);

// router.get('/api/hello', helloApi.getTasks);
// router.post('/api/hello', helloApi.addTask);
// router.get('/', main);


export { router };
