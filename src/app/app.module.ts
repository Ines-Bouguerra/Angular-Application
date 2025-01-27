import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {baseURL} from './shared/baseurl';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import 'hammerjs';
import {ProcessHTTPMsgService} from "./services/process-httpmsg.service";
import {MenuComponent} from './menu/menu.component';
import {MatListModule} from "@angular/material/list";
import {DishdetailComponent} from './dishdetail/dishdetail.component';
import {DishService} from "./services/dish.service";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {PromotionService} from "./services/promotion/promotion.service";
import {LeaderService} from "./services/leader.service";
import {LoginComponent} from './login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from "@angular/material/slider";
import {HighlightDirective} from './directives/highlight.directive';
import {FeedbackService} from "./services/feedback.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule, MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule, MatProgressSpinnerModule, MatSliderModule

  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [DishService, PromotionService, FeedbackService, LeaderService, {
    provide: 'BaseURL',
    useValue: baseURL
  }, ProcessHTTPMsgService
  ],
  bootstrap: [AppComponent],

  exports: [HeaderComponent, FooterComponent]
})
export class AppModule {
}
