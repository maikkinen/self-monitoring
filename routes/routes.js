import { Router } from "../deps.js";
import { showSummary, showReporting, showEveningForm, showMorningForm, showLanding } from "./controllers/behaviorController.js";
import { showLogin, showLogout, showRegistration } from "./controllers/authController.js";

const router = new Router();

router.get('/', showLanding);

router.get('/behavior/reporting', showReporting);
router.get('/behavior/reporting/morning', showMorningForm);
router.get('/behavior/reporting/evening', showEveningForm);
router.get('/behavior/summary', showSummary);

// As making a POST request to add a new reporting entry (morning/evening)
// has effects on both frontend and backend, 
// I made a desicion concerinng the architecture:
// only controllers are used in requests
// that have effect on both frontend

router.post('/behavior/reporting/morning', showMorningForm); 
router.post('/behavior/reporting/evening', showEveningForm);

router.get('/auth/login', showLogin);
router.post('/auth/login', showLogin);
router.post('/auth/logout', showLogout);

router.get('/auth/registration', showRegistration);
router.post('/auth/registration', showRegistration);

export { router }
