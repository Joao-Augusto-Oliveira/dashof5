import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import bxErrorAlt from '@iconify-icons/bx/bx-error-alt';

@Component({
  selector: 'vex-confirmmodal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  bxErrorAlt = bxErrorAlt
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReturnClick(): void {
    this.router.navigate(['/apps/aio-table']);
    this.dialogRef.close();
  }

}


