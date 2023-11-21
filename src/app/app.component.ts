import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangEnum } from '~/app/shared/models/translate/lang.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang(LangEnum.FR);
    translate.use(LangEnum.FR);
  }
}
