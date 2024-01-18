import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  baseUrl = environment.print

  constructor(private http: HttpClient) {
  }

  printAll() {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }
  printLocation(id: any) {
    return this.http.get(`${this.baseUrl}/location/${id}`).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }

  printPatient(id: any) {
    return this.http.get(`${this.baseUrl}/patient/${id}`).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }


}
