import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorVacio'
})
export class ValorVacioPipe implements PipeTransform {

  transform(value: string, termino: string): string {
    
    if (!value) {
      return `No hay valores para ${termino}`; 
    }else{
      return value;
    }
  }

}
