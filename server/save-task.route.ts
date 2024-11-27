import {Request, Response} from 'express';
import {TASKS} from "./db-data";
import {setTimeout} from 'timers';


export function saveCourse(req: Request, res: Response) {

  /*
    console.log("ERROR saving course!");
    res.sendStatus(500);
    return;
  */


  const id = req.params["id"],
    changes = req.body;

  console.log("Saving course changes", id, JSON.stringify(changes));

  const newTask = {
    ...TASKS[id],
    ...changes
  };

  TASKS[id] = newTask;

  console.log("new course version", newTask);

  setTimeout(() => {

    res.status(200).json(TASKS[id]);

  }, 1500);



}
