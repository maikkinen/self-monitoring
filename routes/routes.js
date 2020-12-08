import { Router } from "../deps.js";
import { showTasks  } from "./controllers/trackingController.js";
import { showSummary, showReporting, showEveningForm, showMorningForm,  } from "./controllers/behaviorController.js";
import { showLogin, showRegistration } from "./controllers/authController.js";
import * as trackingApi from "./apis/trackingApi.js";

const router = new Router();

router.get('/', showTasks);

router.get('/behavior/reporting', showReporting);
router.get('/behavior/reporting/morning', showMorningForm);
router.get('/behavior/reporting/evening', showEveningForm);
router.get('/behavior/summary', showSummary);

router.get('/auth/login', showLogin);
router.get('/auth/registration', showRegistration);

//The routes below are here for reference
//...as, we'll be doing similar stuff soon.
router.post('/tasks', trackingApi.addTask);
router.post('/tasks/:id/start', trackingApi.startTask);
router.post('/tasks/:id/complete', trackingApi.completeTask);

router.get('/average', trackingApi.getAverage);

export { router };
