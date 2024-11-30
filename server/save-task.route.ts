import { Request, Response } from 'express';
import { TASKS } from "./db-data";
import { setTimeout } from 'timers';


export function saveTaskStatus(req: Request, res: Response) {

  /*
    console.log("ERROR saving Task!");
    res.sendStatus(500);
    return;
  */


  const id = req.params["id"],
    completed = req.body.status;

  const newTask = {
    ...TASKS[id],
    completed,
    newDate: new Date()
  };

  TASKS[id] = newTask;

  console.log("new Task version ------ ", newTask);

  setTimeout(() => {

    res.status(200).json(TASKS[id]);

  }, 1500);



}

export function saveTask(req: Request, res: Response) {

  /*
    console.log("ERROR saving Task!");
    res.sendStatus(500);
    return;
  */


  const id = req.params["id"],
    changes = req.body;

  console.log("Saving Task changes", id, JSON.stringify(changes));

  const newTask = {
    ...TASKS[id],
    ...changes,
    newDate: new Date()
  };

  TASKS[id] = newTask;

  console.log("new Task version", newTask);

  setTimeout(() => {

    res.status(200).json(TASKS[id]);

  }, 1500);



}
