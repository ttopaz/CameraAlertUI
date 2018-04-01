import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, filter, scan } from 'rxjs/operators';

import { Camera } from './camera/camera';
import { CameraFile } from './camera-files/camera-file';

@Injectable()
export class CameraService {

  constructor(private http: HttpClient) { }

  public getCameras (): Observable<Camera[]> {
    let username: string = 'admin';
    let password: string = 'admin';
    const headers = new HttpHeaders()
            .set("Authorization", "Basic " + btoa(username + ":" + password));
    let camerasUrl = "http://localhost:3500/Cameras";

    return this.http.get<Camera[]>(camerasUrl, {headers});
  }

  private buildImageUrl (id: string, file : CameraFile) : string {
    return "http://admin:admin@localhost:3500/GetCameraImage?Id=" + id + "&File=" + 
    file.File.replace(".mp4", ".jpg");
  }

  public getCameraFiles (id): Observable<CameraFile[]> {
    let username: string = 'admin';
    let password: string = 'admin';
    const headers = new HttpHeaders()
            .set("Authorization", "Basic " + btoa(username + ":" + password));
    let cameraFilesUrl = "http://localhost:3500/CameraFiles?Id=" + id + "&Filter=.mp4";

    return this.http.get<CameraFile[]>(cameraFilesUrl, {headers}).pipe(
      map(res => { 
        return res.map(item => { 
          item.ImageUrl = this.buildImageUrl(id, item);
          return item;
        });
      })
    )
  }

  public getCameraFileImage (id, file): Observable<any> {
    let username: string = 'admin';
    let password: string = 'admin';
    const headers = new HttpHeaders()
            .set("Authorization", "Basic " + btoa(username + ":" + password));
    let cameraFileImageUrl = "http://localhost:3500/GetCameraImage?Id=" + id + "&File=" + 
    file.replace(".mp4", ".jpg");

    const options = {headers, responseType: 'blob' as 'json' };
    return this.http.get<any>(cameraFileImageUrl, options).pipe(
      map(res => { return URL.createObjectURL(res) }
    ))
  }
}