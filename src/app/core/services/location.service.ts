import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseUrl = environment.locations

  constructor(private http: HttpClient) {
  }

  createLocation(body: any) {
    return this.http.post(`${this.baseUrl}`, body)
  }

  getLocations(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=locationName`)
  }

  getLocation(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => {
        return res.data.locationName
      })
    )
  }

  getPatient(pageNo: number, pageSize: number, id: string) {
    return this.http.get(`${this.baseUrl}/${id}/patients?pageNo=${pageNo}&pageSize=${pageSize}`)

  }

  editLocations(name: string, id: string) {
    return this.http.post(`${this.baseUrl}/${id}`, {locationName: name})
  }

  deleteLocations(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  printLocation(id: number) {
    return this.http.get(`${this.baseUrl}`)
  }
}
