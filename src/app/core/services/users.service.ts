import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.users

  constructor(private http: HttpClient) {
  }

  getUsers(pageNo: number,
           pageSize: number,) {
    return this.http.get(`${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=name`)
  }

  editUser(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data)

  }
  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)

  }
}
