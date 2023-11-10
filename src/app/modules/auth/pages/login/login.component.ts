import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  @ViewChild('signInNgForm') signInNgForm!: NgForm;

  signInForm: UntypedFormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router
  ) {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    this._authService.login(this.signInForm.value).subscribe((res) => {
      localStorage.setItem('token', res.accessToken)
      localStorage.setItem('userName', res.userName)
      localStorage.setItem('role', res.role)
      this._router.navigate(['/regions'])
    })
  }
}
