import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

// 建立一個config interface藉此來實做未來要傳的參數名稱型態
export interface BaseHttpConfig {
  isKey: boolean;
  queryFn?: QueryFn;
}
@Injectable()
export class BaseHttpService {
  constructor(private _db: AngularFireDatabase) { }
  object<T>(url: string, config: BaseHttpConfig = { isKey: true }): Observable<T> | Observable<any> {
    const req = this._db.object(url);
    return config.isKey ?
      req.snapshotChanges().map(action => ({ key: action.key, ...action.payload.val() })) :
      req.valueChanges();
  }

  list<T>(url: string, config: BaseHttpConfig = { isKey: true }): Observable<T> | Observable<any> {
    // const req = this._db.list(url);
    const req = this._db.list(url, config.queryFn);
    return config.isKey ?
      req.snapshotChanges()
        .map(actions => actions.map(action => ({ key: action.key, ...action.payload.val() }))) :
      req.valueChanges();
  }
  //
  // list<T>(url: string, config: BaseHttpConfig = { isKey: true }): Observable<T> | Observable<any> {
  //   const req = this._db.list(url, config.queryFn);
  //   return config.isKey ?
  //     req.snapshotChanges().map(
  //       actions => actions.map(action => ({ key: action.key, ...action.payload.val() }))) :
  //     req.valueChanges();
  // }
}
