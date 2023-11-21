import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { LangEnum } from '~/app/shared/models/translate/lang.enum';
import { LocalStorageSubject } from '~/app/shared/stores/local-storage.store';
import { Observable } from 'rxjs';

export const DEFAULT_LANGUAGE: LangEnum = LangEnum.FR;

@Injectable({
  providedIn: 'root',
})
export class LangService {
  lang: LocalStorageSubject<LangEnum>;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {
    this.lang = new LocalStorageSubject<LangEnum>(
      'settings.lang',
      DEFAULT_LANGUAGE,
      true,
    );
    this.translate.use(this.lang.value);
  }

  getConfig = (): Observable<ArrayBuffer> => {
    return this.http.get('', { responseType: 'arraybuffer' });
  };

  switchLanguage(language: LangEnum): void {
    this.translate.use(language);
    this.lang.next(language);
  }
}
