import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import bxErrorAlt from '@iconify-icons/bx/bx-error-alt';


@Component({
  selector: 'vex-usermodal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.scss']
})
export class UsermodalComponent {

  bxErrorAlt = bxErrorAlt
  
  constructor(
    public dialogRef: MatDialogRef<UsermodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


