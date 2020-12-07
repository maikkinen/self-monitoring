import { executeQuery } from "../database/database.js";

const getTasks = async () => {
  const res = await executeQuery("SELECT * FROM timed_tasks ORDER BY id DESC LIMIT 50");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects().map(
      (o) => 
      {  if (o.completed_on) {
          return ({ ...o, duration: Math.round( ((new Date(o.completed_on)) - (new Date(o.started_on)) ) / 1000 ) })
        } else {
          return o
        }
      }
    );
    
  }
  return [];
}

const startTask = async ({ id }) => {
  console.log(id)
  await executeQuery("UPDATE timed_tasks SET started_on = NOW() WHERE id = $1;", id);// ("SELECT * FROM timed_tasks WHERE id = $1;", id);
}

const completeTask = async ({ id }) => {
  console.log("Complete task with id: ", id)
  await executeQuery("UPDATE timed_tasks SET completed_on = NOW() WHERE id = $1;", id);// ("SELECT * FROM timed_tasks WHERE id = $1;", id);
}

const addTask = async (newTask) => { //replace constants with request parameters
  await executeQuery("INSERT INTO timed_tasks (name, started_on, completed_on) VALUES ($1, $2, $3);", newTask.name, newTask.started_on, newTask.completed_on);
}


const getAverage = async () => {
  const res = await executeQuery("SELECT AVG(average) FROM (SELECT EXTRACT(EPOCH FROM completed_on) - EXTRACT(EPOCH FROM started_on) as average FROM timed_tasks) t;");
  if (res && res.rowCount > 0) {
    // console.log('resAsRows: ', res.rowsOfObjects()[0].avg);
    // console.log('dudiduu ', Math.round((res.rowsOfObjects()[0].avg) / 1000));
    return Math.round(res.rowsOfObjects()[0].avg);
  }
  return 0;
}
export { getTasks, startTask, addTask, completeTask, getAverage };