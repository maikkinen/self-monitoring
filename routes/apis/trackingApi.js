import * as trackingService from "../../services/trackingService.js";

const getTasks = async ({ response }) => {
  response.body = await trackingService.getTasks();
};


// to start a task
// to complete a task
// to display the time spent on completing each task
// and to display the average time spent on completing tasks in general.
//


// Problem:
// Post-request toimii, mutta 
// 1) miten redirect takaisin tasks-listaan ('/')
// 2) missä tämän pitäisi tapahtua?

const addTask = async ({ request, response }) => {
  const body = request.body(); // ({ type: 'json' });
  const document = await body.value;
  const name = document.get('name')

  const newTask = {
    name: name,
    stared_on: null,
    completed_on: null
  }

  await trackingService.addTask(newTask);
  response.status = 200;
  response.redirect('/');
  //response.body = await trackingService.getTasks();
};

const startTask = async ({ response, params }) => {
  await trackingService.startTask(params);
  response.redirect('/');
};


const completeTask = async ({ response, params }) => {
  const id = params.id;
  console.log(params)
  await trackingService.completeTask(params);
  response.redirect('/');
};

const getAverage = async ({ response }) => {
  response.body = await trackingService.getAverage();
};

export { getTasks, addTask, startTask, completeTask, getAverage };