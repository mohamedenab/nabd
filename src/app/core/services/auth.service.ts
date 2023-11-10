import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authApi = environment.auth

  constructor(private http: HttpClient) {
  }

  login(body: { email: string, password: string }) {
    return this.http.post(`${this.authApi}/login`, body).pipe(
      map((res: any) => {
        return res.data;
      }))
  }

  register(body: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    roles: string;
    locationListId?: (number)[] | null;
  }) {
    return this.http.post(`${this.authApi}/signup`, body).pipe(
      map((res: any) => {
        return res.data;
      }))
  }

  isUserSuperAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_SU'
  }

  isUserAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_AU'
  }

  isUserNormal(): boolean {
    return localStorage.getItem('role') === 'ROLE_NU'
  }
}
