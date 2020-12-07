// import { getNews, getOneNews, addNews } from '../../services/newsService.js'
import { getAverage, getTasks } from "../../services/trackingService.js";


const showTasks = async ({ render }) => {
  render('index.ejs', { tasks: await getTasks(), average: await getAverage()}); // paa se tänne
};

export { showTasks };