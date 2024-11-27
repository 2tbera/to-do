import {Request, Response} from 'express';
import {TASKS} from './db-data';

export var taskKeyCounter = 100;

export function createCourse(req: Request, res: Response) {

  console.log("Creating new task ...");

  const changes = req.body;

  const newTask = {
    id: taskKeyCounter,
    seqNo: taskKeyCounter,
    ...changes
  };

  TASKS[newTask.id] = newTask;

  taskKeyCounter += 1;

  setTimeout(() => {

    res.status(200).json(newTask);

  }, 1500);

}
