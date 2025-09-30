import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

// this is no longer needed since we are providing the service in 'root'
// bootstrapApplication(AppComponent, {
//   providers: [TasksService],
// }).catch((err) => console.error(err));
bootstrapApplication(AppComponent).catch((err) => console.error(err));
