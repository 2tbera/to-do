
import {Request, Response} from 'express';
import {TASKS} from "./db-data";

export function deleteTask(req: Request, res: Response) {

  console.log("Deleting Task ...");

  const id = req.params["id"];

  const Task = TASKS[id];

  delete TASKS[id];

  setTimeout(() => {

    res.status(200).json({id});

  }, 1500);

}

