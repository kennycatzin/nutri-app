import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string): any {
    let url = URL_SERVICIOS + '/api/imagen/get-imagen';
    if (!img) {
      return url + '/xxx/0';
    }
    return URL_SERVICIOS + img;

    // if (img.indexOf('https') >= 0) {
    //   return img;
    // }

    switch ( tipo ) {
      case 'paciente':
      url += '/paciente/' + img;
      break;

      case 'ejercicio':
      url += '/ejercicio/' + img;
      break;

      case 'receta':
      url += '/receta/' + img;
      break;

      default:
      url += '/xxx/0';
    }
    console.log(url);
    return url;
  }

}
