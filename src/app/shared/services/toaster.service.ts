import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private messageService: MessageService) {}

  showSuccess(key: string, summary: string, detail: string): void {
    this.messageService.add({
      key: key,
      severity: 'success',
      summary: summary,
      detail: detail,
    });
  }

  showFailure(key: string, summary: string, detail: string): void {
    this.messageService.add({
      key: key,
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }

  showInfo(key: string, summary: string, detail: string): void {
    this.messageService.add({
      key: key,
      severity: 'info',
      summary: summary,
      detail: detail,
    });
  }
}
