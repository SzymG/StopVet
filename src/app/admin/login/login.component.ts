import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: FormGroup;
    isMobile: boolean;
    subscriber: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
            validationError: false,
        });
    }

    login() {
        if(this.loginForm.valid) {
            this.authService.login(this.loginForm.getRawValue()).then(() => {
                this.loginForm.reset();
                this.router.navigate(['/']);
                this.toastr.success('Pomyślnie zalogowano!', 'Sukces');
            }).catch((err) => {
                this.toastr.error('Niepoprawny e-mail lub hasło', 'Błąd logowania');
            })
        }
    }

}
