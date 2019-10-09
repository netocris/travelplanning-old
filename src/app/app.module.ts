import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { environment } from '../environments/environment';

/* angularfire */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

/* ng-bootstrap */
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

/* ngx-translate */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader  } from '@ngx-translate/http-loader';
/* required for AOT compilation */
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
/* directives */

/* services */
import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';
import { ConfigService } from './services/config.service';

/* components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/atoms/spinner/spinner.component';
import { NotFoundComponent } from './components/atoms/not-found/not-found.component';
import { DashboardComponent } from './components/organisms/dashboard/dashboard.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NotFoundComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    FirebaseService,
    ConfigService,
    {
      provide: APP_BASE_HREF,
      useValue: environment.contextPath
    },
    {
      provide: LOCALE_ID, useValue: 'pt'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
