import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { VasttrafikService } from './services/vasttrafik.service';
import { Departures } from './types/Departures';
import { MatCardModule} from '@angular/material/card'; 
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'alingsasdepartures';
  input: string = "";
  departures: Departures | null = null;
  today: string = '';
  cssCardClass: string = '';

  constructor(protected readonly vasttrafikSerrvice: VasttrafikService) { }

  async ngOnInit() {
    var todaysDate = new Date();
    var dd = String(todaysDate.getDate()).padStart(2, '0');
    var mm = String(todaysDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = todaysDate.getFullYear();
    this.today = dd + '/' + mm + '/' + yyyy;

    (await this.vasttrafikSerrvice.getDepartures()).subscribe(departures => {
      this.departures = departures;
      if (this.departures) {
        for (let departure of this.departures?.results) {
          departure.onTime = (departure.plannedTime == departure.estimatedTime) ? 'onTime' : 'noOnTime';
          console.log(departure.onTime);
        }
      }
    });

    interval(10000)
    .pipe(switchMap(() => this.vasttrafikSerrvice.getDepartures()))
    .subscribe((result) => {
      result.subscribe(departures => {
        this.departures = departures;
        if (this.departures) {
          for (let departure of this.departures?.results) {
            departure.onTime = (departure.plannedTime == departure.estimatedTime) ? 'onTime' : 'noOnTime';
            console.log(departure.onTime);
          }
        }
      });
    });

  }
  
}
