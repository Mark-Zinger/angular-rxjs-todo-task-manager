import {Injectable} from "@angular/core";
import * as moment from 'moment';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  /**
   * {property} Observable Value
   * */
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

  changeMouth(dir: number) {
    const value = this.date.value.add(dir, 'month');
    this.date.next(value)
  }
}
