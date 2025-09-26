import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // here we have tasks which cannot be modified from outside the service
  private tasks = signal<Task[]>([]);
  // here we expose a read-only version of the tasks signal
  allTasks = this.tasks.asReadonly();

  constructor() {}

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      status: 'OPEN',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => {
      const updatedTasks = oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      return updatedTasks;
    });
  }
}
