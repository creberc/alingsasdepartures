import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Departures } from '../types/Departures';
import { Authorization } from '../types/Authorization';
import { DepartureDetails } from '../types/DepartureDetails';

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
  timeSpanInMinutes: number = 120;

  constructor(private httpClient: HttpClient) { }

  createAuthorization(): Observable <Authorization> {
    return this.httpClient.post<Authorization>(this.endpointFetchAuth, 
    'grant_type=client_credentials', this.httpOptionsFetchAuth);
  }

  async refreshAuthorization(): Promise<void> {
    this.authorization = await firstValueFrom(this.createAuthorization());
  }

  async checkAuthorization(): Promise<void> {
    if (!this.authorization) {
      await this.refreshAuthorization();
    } else if (this.authorization && this.authorization?.expires_in < 20) {
      await this.refreshAuthorization();
    }
  }

  /**
* @return {Departure} Returns list of object containing limited information about the departures for the next 2 hours
*/
  async getDepartures(): Promise<Observable<Departures>> {
    await this.checkAuthorization();
    return this.httpClient.get<Departures>(`${this.endpointPlaneraResa}stop-areas/${this.alingsasgid}/departures?directionGid=${this.goteborggid}&timeSpanInMinutes=${this.timeSpanInMinutes}` , 
    {headers: {'Authorization': `Bearer ${this.authorization?.access_token}`}});
  }

  /**
* @param {string} detailsReference Reference to a specific departure
* @return {DepartureDetails} Returns object containing detailed information about a departure
*/
  async getDepartureByDetailsReference(detailsReference: string): Promise<DepartureDetails> {
    await this.checkAuthorization();
    return firstValueFrom(await this.httpClient.get<DepartureDetails>(`${this.endpointPlaneraResa}stop-areas/${this.alingsasgid}/departures/${detailsReference}/details?includes=servicejourneycalls&includes=occupancy` , 
    {headers: {'Authorization': `Bearer ${this.authorization?.access_token}`}}));
  }

}