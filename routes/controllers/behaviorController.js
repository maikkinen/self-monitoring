import { 
  getLastWeekAverage, 
  getLastMonthAverage, 
  getYesterdayAverage, 
  getTodayAverage ,
  getMorning,
  getEvening
} from "../../services/reportingService.js";

const showLanding = async ({ render }) => {
  const userid = "abcde"
  render('index.ejs', {
    data: {
      today: await getYesterdayAverage(userid),
      yesterday: await getTodayAverage(userid)
    }
  })
}

const showSummary = async ({ render }) => {
  const userid = "abcde"
  render('summary.ejs',
    {
      data:
      {
        lastWeek: await getLastWeekAverage(userid),
        lastMonth: await getLastMonthAverage(userid)
      }
    })
}

const showReporting = async ({ render }) => {
  const userid = "abcde"
  const data = {
    morning: await getMorning(userid),
    evening: await getEvening(userid)
  }
  render('reporting.ejs',
    {
      morning: data.morning,
      evening: data.evening 
    })
}

const showMorningForm = ({ render }) => {
  render('morning.ejs')
}

const showEveningForm = ({ render }) => {
  render('evening.ejs')
}


export { showSummary, showReporting, showMorningForm, showEveningForm, showLanding}