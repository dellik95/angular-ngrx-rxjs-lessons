import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule, FormGroup, FormGroupDirective } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';
import { AuthStore } from '../services/auth.store';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton
  ]
})
export class LoginComponent implements OnInit {


  @Input()
  navigatePage: string;

  form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthStore) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value;

    this.auth.login(val.email, val.password)
      .subscribe(
        {
          next: () => {
            let url = this.navigatePage ?? "/courses";
            this.router.navigateByUrl(url);
          },
          error: () => {
            alert("Login failed!");
          }
        }
      );
  }
}
