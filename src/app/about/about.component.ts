import { Component, OnInit } from '@angular/core';
import {Leader} from "../shared/leader";
import {LeaderService} from "../services/leader.service";
import {expand, flyInOut} from "../animations/app.animation";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'], animations: [
    flyInOut(),expand()
  ],  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }

})

export class AboutComponent implements OnInit {

  leaders: Leader[] ;
  constructor(private leaderService:LeaderService ) { }

  ngOnInit() {
    this.leaders=this.leaderService.getLeaders()
  }

}
