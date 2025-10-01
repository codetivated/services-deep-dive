import { Injectable, signal, inject } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({
//   providedIn: 'root',
// })
export class TasksService {
  private loggingService = inject(LoggingService);

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
    this.loggingService.log(`Task added: ${newTask.title}`);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => {
      const updatedTasks = oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      return updatedTasks;
    });
    this.loggingService.log(`Task updated: ${taskId} to ${newStatus}`);
  }
}
