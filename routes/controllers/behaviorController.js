// import { getAverage, getTasks } from "../../services/trackingService.js";

const showSummary  = ({ render }) => {
  render('summary.ejs')
}

const showReporting  = ({ render }) => {
  render('reporting.ejs')
}


const showMorningForm  = ({ render }) => {
  render('morning.ejs')
}

const showEveningForm  = ({ render }) => {
  render('evening.ejs')
}

export { showSummary, showReporting, showMorningForm, showEveningForm,  }