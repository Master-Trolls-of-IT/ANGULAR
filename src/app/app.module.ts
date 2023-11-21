import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '~/app/app-routing.module';
import { AppComponent } from '~/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuctionPageModule } from '~/app/auction/auction-page.module';
import { LoginPageModule } from '~/app/login/login-page.module';
import { LangEnum } from '~/app/shared/models/translate/lang.enum';
import { SharedModule } from '~/app/shared/shared.module';
import { HeaderComponent } from '~/app/header/component/header.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LoginPageModule,
    AuctionPageModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: LangEnum.FR,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ButtonModule,
    RippleModule,
    ToastModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
