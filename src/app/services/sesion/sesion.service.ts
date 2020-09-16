import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { URL_SERVICIOS } from 'src/config/config';
import { SubirArchivoService } from '../archivos/subir-archivo.service';
import { Sesion } from '../../models/sesion.model';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(public http: HttpClient,
              public subirArchivo: SubirArchivoService) { }

  guardarSesion(sesion: Sesion) {
    console.log(sesion);
    const url = URL_SERVICIOS + '/api/sesiones';
    return this.http.post( url, sesion )
  .pipe(map( (resp: any) => {
    swal.fire('Elemento creada exitósamente', '' , 'success');
    return resp.data;
  }), catchError(err => {
    swal.fire(err.error.message,  'Ha ocurrido un error, error: ' + err.status, 'error');
    return throwError(err);
  }));
}
}
