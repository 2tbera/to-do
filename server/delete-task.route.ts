
import {Request, Response} from 'express';
import {TASKS} from "./db-data";

export function deleteCourse(req: Request, res: Response) {

  console.log("Deleting course ...");

  const id = req.params["id"];

  const course = TASKS[id];

  delete TASKS[id];

  setTimeout(() => {

    res.status(200).json({id});

  }, 1500);

}

