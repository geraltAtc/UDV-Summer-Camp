import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ActiveTasksComponent } from './app/active-tasks/active-tasks.component';
import { DeletedItemsComponent } from './app/deleted-items/deleted-items.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/active', pathMatch: 'full' },
      { path: 'active', component: ActiveTasksComponent },
      { path: 'deleted', component: DeletedItemsComponent },
    ]),
  ],
}).catch((err) => console.error(err));