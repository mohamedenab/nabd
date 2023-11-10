import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "../../../../core/interfaces/location";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
import {UsersService} from "../../../../core/services/users.service";
import {AuthService} from "../../../../core/services/auth.service";
import {User} from "../../../../core/interfaces/users";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements OnInit {
  createUser: FormGroup;
  userTypes = [
    {type: 'ROLE_NU', text: 'مستخدم'},
    {type: 'ROLE_AU', text: 'ادمن'},
    {type: 'ROLE_SU', text: 'مسئول'},
  ]
  locations: Location[] = []
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  public readonly router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private userService: UsersService = inject(UsersService);

  constructor(private fb: FormBuilder) {
    this.createUser = this.fb.group({
      name: ['', [Validators.required]],
      password: [''],
      roles: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      locationListId: [[], [Validators.required]]
    })
  }

  ngOnInit() {
    this.route.data.subscribe((res: any) => {
      this.locations = res.locations['data'];
      console.log(this.locations);
    })
    if (this.router.url.includes('create')) {
      this.createUser.get('password')?.setValidators(Validators.required)
    }
    if (window.history.state.user) {
      this.setForm(window.history.state.user)
    }
  }

  setForm(user: User) {
    this.createUser.patchValue({
      name: user.name,
      roles: user.roles,
      phoneNumber: user.phoneNumber,
      email: user.email,
      locationListId: user.locations,
    })
  }

  submit() {
    if (this.router.url.includes('create')) {

      this.authService.register(this.createUser.value).subscribe((res) => {

      })
    } else {
      if (this.createUser.value.password === '') {
        delete this.createUser.value.password
      }
      this.userService.editUser(this.route.snapshot.paramMap.get('id')!, this.createUser.value).subscribe((res: any) => {
        this.router.navigate(['/users'])
      })
    }
  }
}
