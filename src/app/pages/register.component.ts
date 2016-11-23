import { Component }        from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service'

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
  signupForm: any;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              public auth: AuthenticationService) {
    this.signupForm = formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      retailer: ["", Validators.required],
      role: ["", Validators.required]
    });
  }

  signup() {
    this.auth.registerAccount(
      this.signupForm.controls.first_name.value,
      this.signupForm.controls.last_name.value,
      this.signupForm.controls.email.value,
      this.signupForm.controls.password.value,
      this.signupForm.controls.password.value,
      this.signupForm.controls.retailer.value,
      this.signupForm.controls.role.value)
      .subscribe(
        res => {
          console.log(res);
          // this.goToDashBoard();
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
