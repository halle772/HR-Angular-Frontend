import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }> = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[!@#$%^&*-])[A-Za-z0-9!@#$%^&*-]{8,}$'
        ),
      ],
    ],
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[!@#$%^&*-])[A-Za-z0-9!@#$%^&*-]{8,}$'
        ),
      ],
    ],
  });
  submitForm() {
    const payload = {
      email: this.validateForm.get('email')?.value,
      password: this.validateForm.get('password')?.value,
    };
    this.auth.signUp(payload).subscribe((res) => {
      this.router.navigate(['signin'])
    })
  }
  constructor(private form: NonNullableFormBuilder, private auth: AuthService, private router: Router) {}


}
