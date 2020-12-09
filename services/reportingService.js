import { executeQuery } from "../database/database.js";
import { assertEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";

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

const getLastWeekAverage = async (value, id) => {
  const res = await executeQuery(
    "SELECT ROUND(AVG(sleepquality), 2) as average_sleep_quality," +
    " ROUND(AVG(sleepduration), 2) as average_sleep_duration," +
    " ROUND(AVG(sportsduration), 2) as average_sports_duration," +
    " ROUND(AVG(studyingduration), 2) as average_studying_duration," +
    " ROUND(AVG(mood), 2) as average_mood" +
    " FROM reporting WHERE userid = $1 AND timestamp > current_date - interval '7 days';", id);
  if (res && res.rowCount > 0) {
    const rows = res.rowsOfObjects()[0];
    console.log("avg things: ", rows)
    return res.rowsOfObjects()[0];
  }
  return {};
}

const getLastMonthAverage = async (id) => {
  const res = await executeQuery(
    "SELECT ROUND(AVG(sleepquality), 2) as average_sleep_quality," +
    " ROUND(AVG(sleepduration), 2) as average_sleep_duration," +
    " ROUND(AVG(sportsduration), 2) as average_sports_duration," +
    " ROUND(AVG(studyingduration), 2) as average_studying_duration," +
    " ROUND(AVG(mood), 2) as average_mood" +
    " FROM reporting WHERE userid = $1 AND timestamp > current_date - interval '30 days';", id);
  if (res && res.rowCount > 0) {
    const rows = res.rowsOfObjects()[0];
    console.log("avg things: ", rows)
    return res.rowsOfObjects()[0];
  }
  return {};
}

const getYesterdayAverage = async (id) => {
  const res = await executeQuery(
    "SELECT ROUND(AVG(mood), 2) as average_mood" +
    " FROM reporting WHERE userid = $1" +
    " AND DATE(timestamp) < current_date" +
    " AND DATE(timestamp) >= CURRENT_DATE - INTERVAL '1 DAY' ;", id);
  if (res && res.rowCount > 0) {
    const rows = res.rowsOfObjects()[0];
    console.log("avg things: ", rows)
    return res.rowsOfObjects()[0];
  }
  return {};
}


const getTodayAverage = async (id) => {
  const res = await executeQuery(
    "SELECT ROUND(AVG(mood), 2) as average_mood" +
    " FROM reporting WHERE userid = $1" +
    " AND DATE(timestamp) >= current_date" +
    " AND DATE(timestamp) < CURRENT_DATE + INTERVAL '1 DAY' ;", id);
  if (res && res.rowCount > 0) {
    const rows = res.rowsOfObjects()[0];
    console.log("avg things: ", rows)
    return res.rowsOfObjects()[0];
  }
  return {};
}

const getRecord = async(id) => {
  //Todo: get a specific record...
  //Needed: 
  // 1) Checking, if records for today (this morning or this evening)
  // 2) 
}


export { addRecord,
  getRecords,
  getLastWeekAverage,
  getLastMonthAverage,
  getYesterdayAverage,
  getTodayAverage
}