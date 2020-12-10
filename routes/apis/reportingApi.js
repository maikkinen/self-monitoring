import * as reportingService from "../../services/reportingService.js";

const addMorning = async ({ request, response }) => {
  const body = request.body(); // ({ type: 'json' });
  const document = await body.value;
  const sleepDuration = document.get('sleepDuration');
  const sleepQuality = document.get('sleepQuality');
  const mood = document.get('mood');

  var date = document.get('date');
  if (date === "") {
    date = new Date  //this should be today by default
    //should it be date.now instead?
  }

  console.log('sleepQuality: ', sleepQuality);
  console.log('sleepDuration: ', sleepDuration);
  console.log("date: ", date);
  console.log("date2: ", new Date) // or date.now?

  const entry = {
    sleepDuration: sleepDuration,
    sleepQuality: sleepQuality,
    mood: mood,
    date: date,

    sportsDuration: null,
    type: 'morning',
    studyingDuration: null,
    eatingQuality: null,
    userid: 'abcde' // TODO ADD USER ID TO FRONTEND AND HERE
  }

  console.log(entry);

  await reportingService.addRecord(entry);
  response.status = 200;
  response.redirect('/behavior/reporting');
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
    date = new Date  //this should be today by default
    //should it be date.now instead?
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
    userid: 'abcde' // TODO ADD USER ID TO FRONTEND AND HERE
  }
  console.log('evening entry: ', entry);

  await reportingService.addRecord(entry);
  response.status = 200;
  response.redirect('/behavior/reporting');
}


export { addMorning, addEvening  }