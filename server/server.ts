
import * as express from 'express';
import {Application} from "express";
import {getAllCourses, getCourseById} from "./get-task.route";
import {saveCourse} from './save-task.route';
import {createCourse} from "./create-task.route";
import {deleteCourse} from "./delete-task.route";

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({origin: true}));

app.route('/api/task').get(getAllCourses);

app.route('/api/task').post(createCourse);

app.route('/api/task/:id').get(getCourseById);

app.route('/api/task/:id').put(saveCourse);

app.route('/api/task/:id').delete(deleteCourse);

const httpServer = app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});
