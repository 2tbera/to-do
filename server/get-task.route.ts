import { Request, Response } from 'express';
import { TASKS } from "./db-data";



export function getAllTasks(req: Request, res: Response) {

  /*
      console.log("ERROR loading task!");
      res.status(500).json({message: 'error occurred.'});
      return;
  */

  console.log(`Called GET /api/task`);

  setTimeout(() => {

    console.log(`Returning GET /api/task`);

    res.status(200).json({ task: Object.values(TASKS).map((task: any) => ({ ...task, newDate: new Date() }))});

  }, 1000);

}

export function getTaskById(req: Request, res: Response) {

  setTimeout(() => {
    const TaskId = req.params["id"];

    const task: any = Object.values(TASKS);

    const Task = task.find(Task => Task.id == TaskId);

    if (!Task) {
      res.status(404).json({ message: 'Task not found.' });
    }
    res.status(200).json({ ...Task, newDate: new Date() });
  })

}
