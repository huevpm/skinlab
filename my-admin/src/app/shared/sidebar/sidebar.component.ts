import { Component } from '@angular/core';
import { AuthService } from '@bluebits/users';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
constructor (private authService: AuthService) {}

ngOnInit(): void {}

logoutUser() {
  this.authService.logout();
}
}
