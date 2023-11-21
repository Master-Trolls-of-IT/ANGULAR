import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from '~/app/shared/services/toaster.service';
import { MatRadioModule } from '@angular/material/radio';
import { ModalComponent } from '~/app/shared/components/modal/modal.component';
import { SummaryComponent } from '~/app/shared/components/summary/summary.component';
import { NgForOf, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ModalComponent, SummaryComponent],
  imports: [
    RouterLink,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterLink,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    MatSelectModule,
    MatListModule,
  ],
  exports: [
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterLink,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    SummaryComponent,
    MatSelectModule,
    MatListModule,
    NgIf,
    NgForOf,
    ToastModule,
  ],
  providers: [ToasterService],
})
export class SharedModule {}
