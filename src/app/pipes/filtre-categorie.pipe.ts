import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreCategorie'
})
export class FiltreCategoriePipe implements PipeTransform {


  transform(objs: any, term: any): any {
    if (term === undefined) {
      return objs;
    }
    return objs.filter((obj: { categorie: string; }) => {
      return (obj.categorie.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

}
