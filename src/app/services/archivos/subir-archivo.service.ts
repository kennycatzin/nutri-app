import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../config/config';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: number) {
    return new Promise((resolve, reject) => {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();

    formData.append('imagen', archivo, archivo.name);

    // tslint:disable-next-line:only-arrow-functions
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve( JSON.parse( xhr.response ));
        } else {
          reject(xhr.response);
        }
      }
    };
    const url = URL_SERVICIOS + '/api/imagen/file-upload/' + tipo + '/' + id;
    console.log(url);
    xhr.open('POST', url, true);
    xhr.send(formData);
    });
  }
}
