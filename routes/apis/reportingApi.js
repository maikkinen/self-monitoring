import * as reportingService from "../../services/reportingService.js";

const addMorning = async ({ render, request, response }) => {
  const body = request.body(); // ({ type: 'json' });
  const document = await body.value;
  const sleepDuration = document.get('sleepDuration');
  const sleepQuality = document.get('sleepQuality');
  const mood = document.get('mood');

  var date = document.get('date');
  if (date === "") {
    date = new Date 
  }

  const entry = {
    sleepDuration: sleepDuration,
    sleepQuality: sleepQuality,
    mood: mood,
    date: date,

    sportsDuration: null,
    type: 'morning',
    studyingDuration: null,
    eatingQuality: null,
    userid: 'abcde',
  }

  if (mood > 0) {
    await reportingService.addRecord(entry);
    response.status = 200;
    response.redirect('/behavior/reporting');
  } else {
    response.status = 400;
  }
};

const addEvening = async ({ request, response }) => {
  const body = request.body(); // ({ type: 'json' });
  const document = await body.value;
  const sportsDuration = document.get('sportsDuration')
  const studyingDuration = document.get('studyingDuration')
  const eatingQuality = document.get('eatingQuality')
  const mood = document.get('mood');

  var date = document.get('date');
  if (date === "") {
    date = new Date
  }

  const entry = {
    sportsDuration: sportsDuration,
    studyingDuration: studyingDuration,
    eatingQuality: eatingQuality,
    mood: mood,
    date: date,
    sleepQuality: null,
    sleepDuration: null,
    type: 'evening',
    userid: 'abcde'
  }

  await reportingService.addRecord(entry);
  response.status = 200;
  response.redirect('/behavior/reporting');
}


export { addMorning, addEvening }