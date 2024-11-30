
export const TASKS: any = {

  2: {
    id: 2,
    title: 'test 123123123123123123123123123',
    description: 'Learn signals in depth. Build a modern signal-based application with async/await, standalone components and optional RxJs.',
    priority: 2,
    dueDate: 'Fri Dec 20 2024 13:14:14 GMT+0400 (Georgia Standard Time)',
    completed: 1,
    createdAt: 'Fri Nov 21 2024 13:13:44 GMT+0400 (Georgia Standard Time)'
  },

  17: {
    id: 17,
    title: 'Reactive Angular Task',
    description: 'How to build Angular applications in Reactive style using plain RxJs - Patterns and Anti-Patterns',
    priority: 0,
    dueDate: 'Fri Nov 05 2024 13:14:14 GMT+0400 (Georgia Standard Time)',
    completed: 2,
    createdAt: 'Fri Nov 25 2024 13:14:14 GMT+0400 (Georgia Standard Time)'
  },


  19: {
    id: 19,
    title: 'Modern Angular With Signals',
    description: 'Learn signals in depth. Build a modern signal-based application with async/await, standalone components and optional RxJs.',
    priority: 1,
    dueDate: 'Fri Nov 09 2024 13:14:14 GMT+0400 (Georgia Standard Time)',
    completed: 1,
    createdAt: 'Fri Nov 22 2024 13:13:44 GMT+0400 (Georgia Standard Time)'
  },


  18: {
    id: 18,
    title: 'Modern Angular With Signals',
    description: 'Learn signals in depth. Build a modern signal-based application with async/await, standalone components and optional RxJs.',
    priority: 2,
    dueDate: 'Fri Nov 07 2024 13:14:14 GMT+0400 (Georgia Standard Time)',
    completed: 1,
    createdAt: 'Fri Nov 21 2024 13:13:44 GMT+0400 (Georgia Standard Time)'
  },


};

export function findTaskById(TaskId: number) {
  return TASKS[TaskId];
}
