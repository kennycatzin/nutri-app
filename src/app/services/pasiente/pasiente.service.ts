import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Pasiente } from '../../models/pasiente.model';
import { URL_SERVICIOS } from 'src/config/config';
import { SubirArchivoService } from '../archivos/subir-archivo.service';
@Injectable({
  providedIn: 'root'
})
export class PasienteService {
  pasiente: Pasiente;
  token: string;
  constructor(public http: HttpClient,
              public subirArchivo: SubirArchivoService) { }
  getPasientesPaginacion( desde: number = 0) {
    const url = URL_SERVICIOS + '/api/pasientes/paginacion/' + desde;
    return this.http.get(url);
  }

  crearPasientes(pasiente: Pasiente) {
    const url = URL_SERVICIOS + '/api/pasientes';
    console.log(pasiente);
    return this.http.post( url, pasiente )
      .pipe(map( (resp: any) => {
        swal.fire('Elemento creada exitósamente', '' , 'success');
        return resp.data;
      }), catchError(err => {
        swal.fire(err.error,  'Ha ocurrido un error', 'error');
        return throwError(err);
      }));

    }
    cambiarImagen(archivo: File, id: number) {
      this.subirArchivo.subirArchivo(archivo, 'paciente', id)
      .then( (resp: any) => {
        console.log(resp);
        swal.fire('Operación exitosa', '' + resp.mensaje + '', 'success');
      })
      .catch( (resp: any) => {
        console.log(resp);
        swal.fire('Operación correcta', '', 'success');
      });
    }
    borrar(id: number) {
      const url = URL_SERVICIOS + '/api/pasientes/' + id;
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    actualizar(id: number, pasiente: Pasiente) {
      const url = URL_SERVICIOS + '/api/pasientes/' + id;
      return this.http.put(url, pasiente)
      .pipe(map((resp: any) => {
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return true;
      }));
    }
    busqueda( nombre: string ) {
      const url = URL_SERVICIOS + '/api/pasientes/busqueda';
      const busqueda = { busqueda: nombre };
      return this.http.post( url, busqueda )
      .pipe(map( (resp: any) => {
        return resp.data;
      }));
    }
    getPaciente(id: number) {
      const url = URL_SERVICIOS + '/api/pasientes/' + id;
      return this.http.get(url);
    }
}
