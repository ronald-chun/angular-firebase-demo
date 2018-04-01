import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items$: Observable<any[]>;
  constructor(private _db: AngularFireDatabase) {
    this.items$ = this._db.list('items').valueChanges();
  }
}
