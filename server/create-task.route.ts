import {Request, Response} from 'express';
import {TASKS} from './db-data';

export var taskKeyCounter = 100;

export function createTask(req: Request, res: Response) {


  const changes = req.body;

  const newTask = {
    id: taskKeyCounter,
    ...changes,
    createdAt: new Date(),
    newDate: new Date()
  };


  console.log("Creating new task ...",req.body );

  TASKS[newTask.id] = newTask;

  taskKeyCounter += 1;

  setTimeout(() => {

    res.status(200).json(newTask);

  }, 1500);

}
