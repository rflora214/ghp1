import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login xxx</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Username</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>

        <button type="submit" [disabled]="loading">Login</button>

        <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
        <div *ngIf="userData" class="success">
          <p>Welcome, {{ userData.firstName }} {{ userData.lastName }}!</p>
          <img [src]="userData.image" alt="User Avatar" width="50">
        </div>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      width: 300px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      text-align: center;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #999;
    }
    button:hover {
      background-color: #0056b3;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
    .success {
      margin-top: 10px;
      color: green;
    }
    img {
      display: block;
      margin-top: 5px;
      border-radius: 50%;
    }
  `]
})
export class LoginComponent {
  username: string = 'emilys';
  password: string = 'emilyspass';
  loading: boolean = false;
  errorMessage: string = '';
  userData: any = null;

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.userData = null;

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          expiresInMins: 30, // optional, defaults to 60
        }),
        credentials: 'include' // Include cookies (e.g., accessToken) in the request
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log('Login Success:', data);

      // Store user data
      this.userData = data;

      // Optionally, store accessToken in localStorage/sessionStorage
      localStorage.setItem('accessToken', data.accessToken);

    } catch (error) {
      // ✅ Fix: Cast error as `Error` before accessing `message`
      this.errorMessage = (error as Error).message;
      console.error('Login Error:', error);
    } finally {
      this.loading = false;
    }
  }

}
