import {Injectable} from '@angular/core';
import {Dish} from '../shared/dish';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishees?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  // getDishes(): Dish[] {
  //   return DISHES
  // }
  //
  // getDish(id: string): Dish {
  //   return DISHES.filter((dish) => (dish.id === id))[0];
  // }
  //
  // getFeaturedDish(): Dish {
  //   return DISHES.filter((dish) => dish.featured)[0];
  // }

// getDishes(): Promise<Dish[]> {
//   return Promise.resolve(DISHES);
// }
//
// getDish(id: string): Promise<Dish> {
//   return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
// }
//
// getFeaturedDish(): Promise<Dish> {
//   return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
// }


  // getDishes(): Observable<Dish[]> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes');
  // }
  //
  // getDish(id: number): Observable<Dish> {
  //   return this.http.get<Dish>(baseURL + 'dishes/' + id);
  // }
  //
  // getFeaturedDish(): Observable<Dish> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  // }
  //
  // getDishIds(): Observable<number[] | any> {
  //   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  // }

}
