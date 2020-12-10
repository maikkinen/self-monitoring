import {
  getLastWeekAverage,
  getLastMonthAverage,
  getYesterdayAverage,
  getTodayAverage,
  getMorning,
  getEvening,
  addRecord,
} from "../../services/reportingService.js";

import { validate, required, notNull, numberBetween } from "../../deps.js";

const validationMorning = {
  mood: [required, notNull, numberBetween(1, 5)],
  sleepQuality: [required, notNull, numberBetween(1, 5)],
  sleepDuration: [required, notNull, numberBetween(0, 24)],
};

const validationEvening = {
  mood: [required, notNull, numberBetween(1, 5)],
  studyingDuration: [required, notNull, numberBetween(0, 24)],
  sportsDuration: [required, notNull, numberBetween(0, 24)],
  eatingQuality: [required, notNull, numberBetween(0, 5)],
};


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

const showMorningForm = async ({ render, request, response }) => {

  if (request.method === 'POST') {
    const body = request.body();
    const params = await body.value;
    let entry = {
      type: 'morning',
     
      sportsDuration: null,
      eatingQuality: null,
      studyingDuration: null,
      
      sleepDuration: params.get('sleepDuration'),
      sleepQuality: parseInt(params.get('sleepQuality')),
      mood: parseInt(params.get('mood')),
      date: params.get('date'),
     
      userid: 'abcde', // TODO ADD USER ID TO FRONTEND AND HERE
    }


    if (entry.date === "" || !entry.date) {
      entry.date = new Date
    }

    if (parseInt(entry.sleepDuration) > 0) {
      entry.sleepDuration = parseInt(entry.sleepDuration)
    }
    
    const [passes, errors] = await validate(entry, validationMorning);

  
    if (passes) {
      await addRecord(entry);
      response.redirect('/behavior/reporting');
    } else {
      render('morning.ejs', { 
        errors: errors,
      });
    }
  
  } else {
    render('morning.ejs', { errors: []});
  }
}

const showEveningForm = async ({ render, request, response }) => {
  if (request.method === 'POST') {
    const body = request.body();
    const params = await body.value;
    let entry = {
      type: 'evening',
      
      sleepQuality: null,
      sleepDuration: null,
     
      sportsDuration: params.get('sportsDuration'),
      eatingQuality: parseInt(params.get('eatingQuality')),
      studyingDuration: params.get('studyingDuration'),

      mood: parseInt(params.get('mood')),
      date: params.get('date'),
     
      userid: 'abcde', // TODO ADD USER ID TO FRONTEND AND HERE
    }

    if (entry.date === "" || !entry.date) {
      entry.date = new Date
    }

    if (parseFloat(entry.sportsDuration) > 0) {
      entry.sportsDuration = parseFloat(entry.sportsDuration);
    } 
    if (parseFloat(entry.studyingDuration) > 0) {
      entry.studyingDuration = parseFloat(entry.studyingDuration);
    }
    
    const [passes, errors] = await validate(entry, validationEvening);

    console.log("entry ", entry);
    console.log("errors ", errors);
  
    if (passes) {
      await addRecord(entry);
      response.status = 200;
      response.redirect('/behavior/reporting');
    } else {
      response.status = 400;
      render('evening.ejs', { 
        errors: errors,
      });
    }
  
  } else {
    render('evening.ejs', { errors: []});
  }
}


export { showSummary, showReporting, showMorningForm, showEveningForm, showLanding }