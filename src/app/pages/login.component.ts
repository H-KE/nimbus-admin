import { Component }        from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm: any;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              public auth: AuthenticationService) {
    this.loginForm = formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.auth.signIn(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    ).subscribe(
      res => {
        console.log(res);
        this.goToDashBoard();
      },
      error => {
        console.log(error);
        // this.errorMessage = error.json().errors.full_messages[0];
      }
    )
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard'])
  }
}
