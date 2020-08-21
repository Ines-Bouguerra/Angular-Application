import {Component, Inject, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from "../services/promotion/promotion.service";
import {Leader} from "../shared/leader";
import {LeaderService} from "../services/leader.service";
import {expand, flyInOut} from "../animations/app.animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], animations: [
    flyInOut(),expand()
  ],host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }

})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishes: Dish[];
  dishErrMess: string;
  constructor(private dishservice: DishService,
              private promotionservice: PromotionService, private  leaderService: LeaderService, @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,errmess => this.dishErrMess = <any>errmess);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader,errmess => this.dishErrMess = <any>errmess);
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.dishErrMess = <any>errmess);
  }


}
