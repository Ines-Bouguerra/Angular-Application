import { Injectable } from '@angular/core';
import { Promotion} from "../../shared/promotion";
import {of,  Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {baseURL} from "../../shared/baseurl";
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService} from "../process-httpmsg.service";
import {Dish} from "../../shared/dish";
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) {

  }
  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL+'promotions').pipe(catchError(this.processHTTPMsgService.handleError))
  }


  getPromotion(id: string): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL+'promotions/'+id).pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}

