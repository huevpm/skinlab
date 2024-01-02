import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../models/user';
import { UsersService } from '../users-list/users.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private usersService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService

  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string) {
  this.confirmationService.confirm({
    message: 'Bạn có chắc chắn muốn xóa người dùng này?',
    header: 'Xác nhận',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.usersService.deleteUser(userId).subscribe(() => {
        this._getUsers();
        this.messageService.add({severity:'success',
        summary:'Success', 
        detail:'Đã xóa người dùng thành công'});
      },
      (error) => {
        this.messageService.add({severity:'error', 
        summary:'Error',
        detail:'Đã xảy ra lỗi'
      });
      }
      );
    }
  })
}

  
updateUser(userId: string): void {
  console.log(`Navigating to update user with ID: ${userId}`);
  this.router.navigate([`/users/form/${userId}`]);
}
  


  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

}
