import {Injectable} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {Feedback} from '../shared/feedback'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {Dish} from "../shared/dish";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) {
  }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    // return this.http.post<Feedback>(this.baseURL, feedback).pipe(catchError(this.handleError('submitFeedback', feedback)));
    return this.http.post<Feedback>(baseURL +'feedback',feedback).pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getfeedbacks() :Observable<any>{
    return this.http.get(baseURL+'feedback').
    pipe(
      map((data: Feedback[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    )
  }
}
