import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    
    return heroe.alt_img ? heroe.alt_img : heroe.id !== undefined ? `assets/heroes/${heroe.id}.jpg` : `assets/no-image.png`;
    // return heroe.id !== undefined ? `assets/heroes/${heroe.id}.jpg` : `assets/no-image.png`;
  }
 
}
