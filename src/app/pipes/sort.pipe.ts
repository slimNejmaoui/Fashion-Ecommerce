import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(T: any) {


    var x: any;

    for (var i = 0; i < T.length - 1; i++) {
      for (var j = i + 1; j < T.length; j++) {

        if (Number(T[i].price) < Number(T[j].price)) {
          x = T[i];
          T[i] = T[j];
          T[j] = x;
        }

      }
    }
    return T;
  }

}
