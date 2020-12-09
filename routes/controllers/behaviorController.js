// import { getAverage, getTasks } from "../../services/trackingService.js";

import { getLastWeekAverage, getLastMonthAverage, getYesterdayAverage, getTodayAverage } from "../../services/reportingService.js";

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

const showReporting = ({ render }) => {
  render('reporting.ejs')
}

const showMorningForm = ({ render }) => {
  render('morning.ejs')
}

const showEveningForm = ({ render }) => {
  render('evening.ejs')
}


export { showSummary, showReporting, showMorningForm, showEveningForm, showLanding}