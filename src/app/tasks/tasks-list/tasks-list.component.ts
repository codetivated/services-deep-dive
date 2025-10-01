import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private taskService = inject(TasksServiceToken);

  private selectedFilter = signal<string>('all');
  // `selectedFilter` is a signal that holds the currently selected task status filter.
  // `tasks` is a computed signal that reacts to changes in:
  //   1. `selectedFilter()` — when the user changes the filter
  //   2. `this.taskService.allTasks()` — when the task list updates (e.g., task added/removed)

  // Whenever either of these signals change, the computed block is re-evaluated automatically,
  // and the correct filtered list of tasks is returned. This ensures that the UI stays in sync
  // with the filter and the data, without needing manual subscriptions or change detection.

  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      case 'all':
        return this.taskService.allTasks();
      default:
        return [];
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
