import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-admin';
// }

// export class AppComponent implements OnInit {
//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     // Check if the user is not logged in and navigate to the login page

//       this.router.navigate(['/login']);
//   }
}
