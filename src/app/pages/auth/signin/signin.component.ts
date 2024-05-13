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
    ]
  });

  errors: {
    [key: string]: boolean | undefined;
    email: boolean;
    password: boolean;
  } = {
    email: false,
    password: false
  };

  constructor(
    private form: NonNullableFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  getControl(name: string) {
    return this.validateForm.get(name);
  }

  updateValidationStatus() {
    Object.keys(this.errors).forEach((key: string) => {
      const control = this.getControl(key);
      this.errors[key] = control?.invalid && control?.dirty;
      if (key === 'confirmPassword') {
        this.errors[key] = this.errors[key] || control?.value != this.getControl('password')?.value;
      }
    });
    return this.validateForm.valid;
  }


  submitForm() {
    if (this.updateValidationStatus()){
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
}
