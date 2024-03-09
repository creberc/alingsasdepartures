import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Departures } from '../types/Departures';
import { Authorization } from '../types/Authorization';

@Injectable({
  providedIn: 'root'
})
export class VasttrafikService {

  private endpointPlaneraResa: string = "https://ext-api.vasttrafik.se/pr/v4/";
  private endpointFetchAuth: string = "https://ext-api.vasttrafik.se/token";
  authorization: Authorization | null = null;
  private httpOptionsFetchAuth = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      Authorization: 'Basic bGlXeTFNMHR0N3pXUzJoM2JfUW9aS0txdk9ZYTpqb3FCTV9aUVU2cHJnNmg4WHRuNkZHaWJOSjBh'
    })
  };
  alingsasgid: string = "9021014017510000";
  goteborggid: string = "9021014008000000"

  constructor(private httpClient: HttpClient) { }

  getAuthorization(): Observable <Authorization> {
    return this.httpClient.post<Authorization>(this.endpointFetchAuth, 
    'grant_type=client_credentials', this.httpOptionsFetchAuth);
  }

  async refreshAuthorization(): Promise<void> {
    this.authorization = await firstValueFrom(this.getAuthorization());
  }

  async getDepartures(): Promise<Observable<Departures>> {
    if (this.authorization) {
      if (this.authorization?.expires_in < 20) {
        await this.refreshAuthorization();
      }
    } else {
      await this.refreshAuthorization();
    }
    return this.httpClient.get<Departures>(`${this.endpointPlaneraResa}stop-areas/${this.alingsasgid}/departures?directionGid=${this.goteborggid}&timeSpanInMinutes=120` , 
    {headers: {'Authorization': `Bearer ${this.authorization?.access_token}`}});
  }


}
