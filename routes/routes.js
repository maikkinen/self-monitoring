import { Router } from "../deps.js";
import { showSummary, showReporting, showEveningForm, showMorningForm, showLanding } from "./controllers/behaviorController.js";
import { showLogin, showRegistration } from "./controllers/authController.js";
import * as reportingApi from "./apis/reportingApi.js";

const router = new Router();

router.get('/', showLanding);

router.get('/behavior/reporting', showReporting);
router.get('/behavior/reporting/morning', showMorningForm);
router.get('/behavior/reporting/evening', showEveningForm);
router.get('/behavior/summary', showSummary);

router.post('/behavior/reporting/morning', showMorningForm); //no Api in use anymore
router.post('/behavior/reporting/evening', showEveningForm);

router.get('/auth/login', showLogin);
router.get('/auth/registration', showRegistration);

export { router };
