import { executeQuery } from "../database/database.js";

const getRecords = async () => {
  const res = await executeQuery("SELECT * FROM reporting ORDER BY id DESC LIMIT 50");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }
  return [];
}

const addRecord = async (entry) => { //replace timed_tasks with correct table
  await executeQuery(
    "INSERT INTO reporting" +
    " (userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality)" + 
    " VALUES ( $1, NOW(), $2, $3, $4, $5, $6, $7, $8);",
    entry.userid, entry.type, entry.sleepDuration, entry.sleepQuality, entry.mood, entry.sportsDuration, entry.studyingDuration, entry.eatingQuality);
}

const getLastWeekAverage = async (userid) => {
  const res = await executeQuery(
    "SELECT ROUND(AVG(sleepquality), 2) as average_sleep_quality," +
    " ROUND(AVG(sleepduration), 2) as average_sleep_duration," +
    " ROUND(AVG(sportsduration), 2) as average_sports_duration," +
    " ROUND(AVG(studyingduration), 2) as average_studying_duration," +
    " ROUND(AVG(mood), 2) as average_mood" +
    " FROM reporting WHERE userid = $1 AND timestamp > now() - interval '90 days';", userid);
  if (res && res.rowCount > 0) {
    const rows = res.rowsOfObjects()[0];
    
    const retObject = res.rowsOfObjects()[0]
    if (!retObject.average_sleep_quality || isNaN(retObject.average_sleep_quality) ) {
      retObject.average_sleep_quality = "- no data -"
    }
    if (!retObject.average_sleep_duration || isNaN(retObject.average_sleep_duration) ) {
      retObject.average_sleep_duration = "- no data -"
    }
    if (!retObject.average_sports_duration || isNaN(retObject.average_sports_duration) ) {
      retObject.average_sports_duration = "- no data -"
    }
    if (!retObject.average_studying_duration || isNaN(retObject.average_studying_duration) ) {
      retObject.average_studying_duration = "- no data -"
    }
    if (!retObject.average_mood || isNaN(retObject.average_mood) ) {
      retObject.average_mood = "- no data -"
    }
    return retObject;
  } else {
    return {
      average_sleep_quality: "- no data -",
      average_sleep_duration: "- no data -",
      average_sports_duration: "- no data -",
      average_studying_duration: "- no data -",
      average_mood: "- no data -"
    };
  };
}

const getLastMonthAverage = async (userid) => {
  const res = await executeQuery(
    "SELECT ROUND(AVG(sleepquality), 2) as average_sleep_quality," +
    " ROUND(AVG(sleepduration), 2) as average_sleep_duration," +
    " ROUND(AVG(sportsduration), 2) as average_sports_duration," +
    " ROUND(AVG(studyingduration), 2) as average_studying_duration," +
    " ROUND(AVG(mood), 2) as average_mood" +
    " FROM reporting WHERE userid = $1 AND timestamp > now() - interval '30 days';", userid);
    if (res && res.rowCount > 0) {
      const rows = res.rowsOfObjects()[0];
      
      const retObject = res.rowsOfObjects()[0]
      if (!retObject.average_sleep_quality || isNaN(retObject.average_sleep_quality) ) {
        retObject.average_sleep_quality = "- no data -"
      } 
      if (!retObject.average_sleep_duration || isNaN(retObject.average_sleep_duration) ) {
        retObject.average_sleep_duration = "- no data -"
      } 
      if (!retObject.average_sports_duration || isNaN(retObject.average_sports_duration) ) {
        retObject.average_sports_duration = "- no data -"
      } 
      if (!retObject.average_studying_duration || isNaN(retObject.average_studying_duration) ) {
        retObject.average_studying_duration = "- no data -"
      } 
      if (!retObject.average_mood || isNaN(retObject.average_mood) ) {
        retObject.average_mood = "- no data -"
      }
      return retObject;
    } else {
      return {
        average_sleep_quality: "- no data -",
        average_sleep_duration: "- no data -",
        average_sports_duration: "- no data -",
        average_studying_duration: "- no data -",
        average_mood: "- no data -"
      };
    };
}

const getYesterdayAverage = async (id) => {
  const res = await executeQuery(
    "SELECT ROUND(AVG(mood), 2) as average_mood" +
    " FROM reporting WHERE userid = $1" +
    " AND DATE(timestamp) < current_date" +
    " AND DATE(timestamp) < CURRENT_DATE - INTERVAL '1 DAYS' ;", id);
  if (res && res.rowCount > 0) {
    const rows = res.rowsOfObjects()[0];
    console.log("rows is: ", rows)
    return res.rowsOfObjects()[0];
  }
  return {};
}


const getTodayAverage = async (id) => {
  const res = await executeQuery(
    "SELECT ROUND(AVG(mood), 2) as average_mood" +
    " FROM reporting WHERE userid = $1" +
    " AND DATE(timestamp) >= current_date" +
    " AND DATE(timestamp) < CURRENT_DATE + INTERVAL '1 DAYS' ;", id);
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects()[0];
  }
  return {};
}

const getMorning = async (id) => {
  const res = await executeQuery(
    "SELECT mood, userid, timestamp" +
    " FROM reporting WHERE userid = $1" +
    " AND type = 'morning'" +
    " AND DATE(timestamp) >= CURRENT_DATE;", id);
  if (res && res.rowCount > 0) {
    const rows = res.rowsOfObjects()[0];

    return true;
  }
  return false;
}

const getEvening = async (id) => {
  const res = await executeQuery(
    "SELECT mood, userid, timestamp" +
    " FROM reporting WHERE userid = $1" +
    " AND type = 'evening'" +
    " AND DATE(timestamp) >= CURRENT_DATE;", id);
  if (res && res.rowCount > 0) {
    const rows = res.rowsOfObjects()[0];

    return true;
  }
  return false;
}


export { 
  addRecord,
  getRecords,
  getMorning,
  getEvening,
  getLastWeekAverage,
  getLastMonthAverage,
  getYesterdayAverage,
  getTodayAverage,
}