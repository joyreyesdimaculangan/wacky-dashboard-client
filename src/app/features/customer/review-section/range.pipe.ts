import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appRange',
})
export class RangePipe implements PipeTransform {
  transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i);
  }
}
