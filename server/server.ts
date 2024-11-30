
import * as express from 'express';
import {Application} from "express";
import {getAllTasks, getTaskById} from "./get-task.route";
import {saveTask, saveTaskStatus} from './save-task.route';
import {createTask} from "./create-task.route";
import {deleteTask} from "./delete-task.route";

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({origin: true}));

app.route('/api/task').get(getAllTasks);

app.route('/api/task').post(createTask);

app.route('/api/task/:id').get(getTaskById);

app.route('/api/task/:id').put(saveTask);

app.route('/api/task/status/:id').put(saveTaskStatus);

app.route('/api/task/:id').delete(deleteTask);

const httpServer = app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});
