import {Request, Response} from 'express';
import {TASKS} from "./db-data";



export function getAllCourses(req: Request, res: Response) {

  /*
      console.log("ERROR loading task!");
      res.status(500).json({message: 'error occurred.'});
      return;
  */

 console.log(`Called GET /api/task`);

  setTimeout(() => {

    console.log(`Returning GET /api/task`);

    res.status(200).json({task:Object.values(TASKS)});

  }, 1000);

}

export function getCourseById(req: Request, res: Response) {

  setTimeout(() => {
    const courseId = req.params["id"];

    const task:any = Object.values(TASKS);

    const course = task.find(course => course.id == courseId);

    res.status(200).json(course);
  })

}
