import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateLocale'
})
export class DateLocalePipe implements PipeTransform {

  transform(value: string, locale: string, zone: string): string {
    const dateVal = Number(value);
    return formatDate(new Date(dateVal), 'EEEE, MMMM d, y, h:mm:ss a zzzz', locale, zone);
  }

}
