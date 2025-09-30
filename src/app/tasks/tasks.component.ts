import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // providers: [TasksService], <-- see comment below
})
export class TasksComponent {}

// injecting the service here at the tasks component level (this is an element injector)
// so that the same instance of the service is shared between NewTaskComponent and TasksListComponent
// If we did not provide it at this level and only on the component level, then each component would get its own instance of the service
// because they are both standalone components and each have their own injector tree
// By providing it here, we ensure that both components share the same instance of the service
// which is what we want in this case since they need to share state (the list of tasks)
