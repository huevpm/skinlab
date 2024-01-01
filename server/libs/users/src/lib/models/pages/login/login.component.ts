import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/form';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Email hoặc mật khẩu đã sai'
    constructor(
        private formBuilder: FormBuilder, 
        private auth: AuthService, 
        private localstorageService: LocalstorageService,
        private router : Router 
        ) {}

    ngOnInit(): void {
        this._initLoginForm();
    }
    private_initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['',Validators.required, Validators.email],
            password: ['',Validators.required]
        });
    }

    onSubmit() {
        this.isSubmitted =true;

        if(this.loginFormGroup.invalid) return;
        this.auth.login(this.loginForm.email.value, this.loginForm.password.value) .subscribe(
        (user) => {
            this.authError = false;
            this.localstorageService.setToken(user.token);
            this.router.navigate(['/']);
        },
        (error: HttpErrorResponse)=>{
            console.log(error);
            this.authError = true;
            if (error.status !== 400) {
                this.authMessage = " Lỗi hệ thống, vui lòng thử lại sau";
            }

        }
        );
        }


    get loginForm(){
        return this.loginFormGroup.controls;
    }
}