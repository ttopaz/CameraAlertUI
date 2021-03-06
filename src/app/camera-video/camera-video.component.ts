import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-camera-video',
  templateUrl: './camera-video.component.html',
  styleUrls: ['./camera-video.component.scss']
})
export class CameraVideoComponent {
  videoUrl : string;
  title : string;
  constructor(
    public dialogRef: MatDialogRef<CameraVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    { 
      this.videoUrl = data.videoUrl;
      this.title = data.title;
    }

cancel = function() {
  this.dialogRef.close();
};

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
