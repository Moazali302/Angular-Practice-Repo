import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string,limits:10):string {
    if(!value) return '';
    if(value.length <=limits)return value;
    return value.substring(0,limits)+"....";
  }

}
