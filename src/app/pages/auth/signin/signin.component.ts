import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
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

  constructor(
    private form: NonNullableFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submitForm() {
    const payload = {
      email: this.validateForm.get('email')?.value,
      password: this.validateForm.get('password')?.value,
    };
    this.auth.login(payload).subscribe((res:any) => {
      localStorage.setItem('token', res.access_token);
      this.router.navigate(['/']);
    });
  }
}
