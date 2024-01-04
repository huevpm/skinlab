import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;
  error!: string;

  constructor(private router: Router) {}

  onSubmit(): void {
    // Kiểm tra tài khoản và mật khẩu nhập vào có đúng hay không
    if (this.username === 'huevpm' && this.password === '123') {
      // Nếu đúng, chuyển hướng đến trang quản trị
      this.router.navigate(['/dashboard']);
    } else {
      // Nếu sai, hiển thị thông báo lỗi
      this.error = 'Kiểm tra lại tên đăng nhập hoặc password';
    }
  }
}
