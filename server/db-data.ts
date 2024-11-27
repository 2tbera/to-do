
export const TASKS: any = {

  18: {
    id: 18,
    title: 'Modern Angular With Signals',
    description: 'Learn signals in depth. Build a modern signal-based application with async/await, standalone components and optional RxJs.',
    priority: 'High',
    dueDate: new Date(),
    completed: false,
    createdAt: new Date()
  },

  17: {
    id: 17,
    title: 'Reactive Angular Course',
    description: 'How to build Angular applications in Reactive style using plain RxJs - Patterns and Anti-Patterns',
    priority: 'LOW',
    dueDate: new Date(),
    completed: false,
    createdAt: new Date()
  },

};

export function findCourseById(courseId: number) {
  return TASKS[courseId];
}
