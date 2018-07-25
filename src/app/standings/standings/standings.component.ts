import { Component, OnInit } from '@angular/core';
import { StandingsService } from '../standings.service';
import { Standing } from './standings.models';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

    initialized: boolean;
    standings: Standing[];

    displayedColumns: string[] = ['rank', 'name', 'gamesPlayed', 'points'];

    constructor(
        private standingsService: StandingsService
    ) {
        this.initialized = false;
        this.standings = [];
    }

    ngOnInit() {
        this.standingsService.get().subscribe(standings => {
            this.initialized = true;
            this.standings = standings;
        });
    }

}
