// import { getNews, getOneNews, addNews } from '../../services/newsService.js'
import { getAverage, getTasks } from "../../services/trackingService.js";


const showTasks = async ({ render }) => {
  render('index.ejs', { tasks: await getTasks(), average: await getAverage()}); // paa se tänne
};

const showMorningForm  = ({ render }) => {
  render('morning.ejs')
}

const showEveningForm  = ({ render }) => {
  render('evening.ejs')
}

export { showTasks, showMorningForm, showEveningForm};