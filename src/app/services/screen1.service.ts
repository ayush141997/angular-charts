import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Screen1Service {

  constructor(private _http: HttpClient) { }

  url : string = '../../assets/data.json'

  getData(){
    return this._http.get(this.url)
  }
}
