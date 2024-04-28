import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { VasttrafikService } from './services/vasttrafik.service';
import { Departures, Result } from './types/Departures';
import { MatCardModule} from '@angular/material/card'; 
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'alingsasdepartures';
  departures: Departures | null = null;
  todayTime: string = '';

  constructor(protected readonly vasttrafikSerrvice: VasttrafikService) { }

  async ngOnInit() {
    await this.getAndFilterDepartures();

    interval(60000).subscribe(async x => {
      await this.getAndFilterDepartures();
    })
  }

  async getAndFilterDepartures(): Promise<void> {
    this.departures = await this.vasttrafikSerrvice.getDepartures();
    if (this.departures) {
      this.createNowTime();
      for (let departure of this.departures?.results) {
        departure.departureDetails = await this.vasttrafikSerrvice.getDepartureByDetailsReference(departure.detailsReference);
        while (departure.departureDetails.serviceJourneys[0].callsOnServiceJourney[0].stopPoint.name != 'Alingsås station, Alingsås') {
          departure.departureDetails.serviceJourneys[0].callsOnServiceJourney.shift();
        }

      }
    }
  }

  createNowTime(): void {
    var todaysDate = new Date();
    var dd = String(todaysDate.getDate()).padStart(2, '0');
    var MM = String(todaysDate.getMonth() + 1).padStart(2, '0');
    var yyyy = todaysDate.getFullYear();
    var hh = todaysDate.getHours();
    var mm = todaysDate.getMinutes().toString();
    this.todayTime = dd + '/' + MM + '/' + yyyy + ' ' + hh + ':' + ((mm.length == 1) ? ('0' + mm) : mm);
  }

  expandOrCollapse(index: number): void {
    if (this.departures && this.departures.results[index].showExpandedDetails) {
      this.departures.results[index].showExpandedDetails = !this.departures.results[index].showExpandedDetails;
    } else if (this.departures) {
      this.departures.results[index].showExpandedDetails = true;
    }
  }
  
  calculateTravelTime(departure: Result): string {
    var estArrivalTime = departure.departureDetails.serviceJourneys[0].callsOnServiceJourney
    .find(ele => ele.stopPoint.name == 'Göteborg Central, Göteborg')?.estimatedArrivalTime;
    var estDepartureTime = departure.estimatedTime;
    var timeDifference = '-';
    if(estArrivalTime && estDepartureTime) {
      timeDifference = ((Date.parse(estArrivalTime) - Date.parse(estDepartureTime)) / 60000).toString();
    }
    return timeDifference;
  }

  getBelastning(departure: Result): string {
    switch(departure.departureDetails.serviceJourneys[0].callsOnServiceJourney[0].occupancy.level) { 
      case 'low': { 
         return 'Låg';
      } 
      case 'medium': { 
         return 'Medium';
      } 
      case 'high': { 
        return 'Hög';
      } 
      default: { 
         return 'Ingen prognos';
      } 
   } 
  }

}
