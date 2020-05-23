import { Pipe, PipeTransform } from '@angular/core';
import { Duration } from 'luxon';

@Pipe({
  name: 'prettyDuration'
})
export class PrettyDurationPipe implements PipeTransform {

  transform(value: Duration, ...args: unknown[]): string {
    return value.shiftTo('hours', 'minutes').toFormat("h'h'mm'm'");
  }

}
