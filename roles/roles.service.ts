import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class RolesService {
  // token: any;
  headers: any;
  userId: any;
  private userData = new BehaviorSubject({});
  userDataSubject = this.userData.asObservable();

  constructor(private httpClient: HttpClient) { }

  getMethod(url: string, filters: Array<string>, viewMode?: string): Observable<any> {
    if (viewMode) {
      if (!filters || filters.length <= 0) {
        filters = [];
      }
      filters.push(`rbav=${viewMode}`);
    }
    let filtersStr = "";
    if (filters && filters.length > 0) {
      filtersStr += "?" + filters.join("&");
    }
    return this.httpClient.get(environment.baseurl + url + filtersStr, {});
  }


  postMethodJson(url: string, dataSet: any): Observable<any> {
    return this.httpClient.post(environment.baseurl + url, dataSet, {});
  }

  putMethodJson(url: string, dataSet: any): Observable<any> {
    return this.httpClient.put(environment.baseurl + url, dataSet, {});
  }

  patchMethodJson(url: string, dataSet: any): Observable<any> {
    return this.httpClient.patch(environment.baseurl + url, dataSet, {});
  }

  deleteMethod(url: string, payload: any = {}): Observable<any> {
    return this.httpClient.delete(environment.baseurl + url, { body: payload });
  }
}
