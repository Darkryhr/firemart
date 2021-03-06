import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.filter((product) => product.category === args[0]);
  }
}
