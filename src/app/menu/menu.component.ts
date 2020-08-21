import {Component, OnInit, Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from "../services/dish.service";
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'], animations: [
    flyInOut(),expand()
  ],// tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }
})


export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;



  // selectedDish: Dish;

  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }
  constructor(private dishService: DishService,
              @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    //this.dishes=this.dishService.getDishes()
    // this.dishService.getDishes()
    //   .then(dishes => this.dishes = dishes);

    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

}
