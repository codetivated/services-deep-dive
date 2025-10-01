import { InjectionToken, Provider } from '@angular/core';

//
// TASK TYPES & INTERFACES
//

// Status values used in the Task model
export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

// Interface for a single task object
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// Type for status options used in UI (e.g., dropdowns)
export type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done'; // used in the form control
  taskStatus: TaskStatus; // maps to internal model
  text: string; // user-friendly label
}[];

//
// CONSTANTS
//

// Actual options list for task statuses
export const TaskStatusOptions: TaskStatusOptions = [
  { value: 'open', taskStatus: 'OPEN', text: 'Open' },
  { value: 'in-progress', taskStatus: 'IN_PROGRESS', text: 'In Progress' },
  { value: 'done', taskStatus: 'DONE', text: 'Done' },
];

//
// INJECTION TOKEN & PROVIDER
//

// Injection token to provide the status options
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>(
  'task-status-options'
);

// Provider for injecting the status options array
export const tasksStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
};
