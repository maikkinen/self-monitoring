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


const showLanding = async ({ render, session }) => {
  let loggedInUserId;
  let loggedInUserEmail;
  const sessionUser = await session.get('user');
  if(sessionUser) {
    loggedInUserId = sessionUser.id
    loggedInUserEmail = sessionUser.email
  } else {
    return;
  }

  render('index.ejs', {
    data: {
      today: await getYesterdayAverage(loggedInUserId),
      yesterday: await getTodayAverage(loggedInUserId)
    },
    loggedInUserEmail: loggedInUserEmail,
  })
}

const showSummary = async ({ render, session }) => {
  let loggedInUserId;
  const sessionUser = await session.get('user');
  if(sessionUser) {
    loggedInUserId = sessionUser.id
  } else {
    return;
  }
  render('summary.ejs',
    {
      data:
      {
        lastWeek: await getLastWeekAverage(loggedInUserId),
        lastMonth: await getLastMonthAverage(loggedInUserId)
      }
    })
}

const showReporting = async ({ render, session }) => {
  let loggedInUserId;
  const sessionUser = await session.get('user');
  if(sessionUser) {
    loggedInUserId = sessionUser.id
  } else {
    return;
  }
  const data = {
    morning: await getMorning(loggedInUserId),
    evening: await getEvening(loggedInUserId)
  }
  render('reporting.ejs',
    {
      morning: data.morning,
      evening: data.evening
    })
}

const showMorningForm = async ({ render, request, response, session }) => {
  let loggedInUserId;
  const sessionUser = await session.get('user');
  if(sessionUser) {
    loggedInUserId = sessionUser.id
  } else {
    return;
  }

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
     
      userid: loggedInUserId
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

const showEveningForm = async ({ render, request, response, session }) => {
  let loggedInUserId;
  const sessionUser = await session.get('user');
  if(sessionUser) {
    loggedInUserId = sessionUser.id
  } else {
    return;
  }

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
     
      userid: loggedInUserId
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

    // Left here, in case you'd like to see the values in terminal. :)
    // console.log("entry ", entry);
    // console.log("errors ", errors);
  
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