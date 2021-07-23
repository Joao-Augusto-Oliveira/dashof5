import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import bxErrorAlt from '@iconify-icons/bx/bx-error-alt';


@Component({
  selector: 'vex-alertmodal',
  templateUrl: './alertmodal.component.html',
  styleUrls: ['./alertmodal.component.scss']
})
export class AlertmodalComponent {

  bxErrorAlt = bxErrorAlt
  
  constructor(
    public dialogRef: MatDialogRef<AlertmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


