import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone component
  imports: [LoginComponent], // ✅ Import LoginComponent directly
  template: `<app-login></app-login>`,
})
export class AppComponent { }
