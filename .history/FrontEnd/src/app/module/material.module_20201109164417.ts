import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ReactiveFormsModule , FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { ConfirmationPopover } from 'src/environments/environment';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
const confirm:any =  ConfirmationPopoverModule.forRoot({
  confirmButtonType: ConfirmationPopover.confirmButtonType,
  confirmText: ConfirmationPopover.confirmText,
  reverseButtonOrder: ConfirmationPopover.reverseButtonOrder,
  cancelText :ConfirmationPopover.cancelText
})
@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RecaptchaModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaFormsModule,
    NgbModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    confirm
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RecaptchaModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaFormsModule,
    NgbModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    confirm

  ]
})
export class MaterialModule {}
