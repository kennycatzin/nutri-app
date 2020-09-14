import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Ejercicio } from '../../models/ejercicio.model';
import { URL_SERVICIOS } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  ejercicio: Ejercicio;
  token: string;
  constructor(public http: HttpClient) { }
  getElementoPaginacion( desde: Number = 0) {
    let url = URL_SERVICIOS + '/api/ejercicios/paginacion/' + desde;
    return this.http.get(url);
  }

  crearElemento(ejercicio: Ejercicio) {
    let url = URL_SERVICIOS + '/api/ejercicios';
    console.log(ejercicio);
    return this.http.post( url, ejercicio )
      .pipe(map( (resp: any) => {
        swal.fire('Elemento creado exitósamente', '' , 'success');
        return resp.data;
      }));
    }

    borrar(id: number) {
      let url = URL_SERVICIOS + '/api/ejercicios/' + id;
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    actualizar(id: number, ejercicio: Ejercicio) {
      let url = URL_SERVICIOS + '/api/ejercicios/' + id;
      return this.http.put(url, ejercicio)
      .pipe(map((resp: any) => {
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return true;
      }));
    }
    busqueda( nombre: string ) {
      let url = URL_SERVICIOS + '/api/ejercicios/busqueda';

      const busqueda = { busqueda: nombre };
      return this.http.post( url, busqueda )
      .pipe(map( (resp: any) => {
        return resp.data;
      }));
    }
    getClasificado( id: number ) {
      const url = URL_SERVICIOS + '/api/ejercicios/get-ejercicio-clasificado/' + id;
      return this.http.get(url);
    }
    getByID( id: number ) {
      const url = URL_SERVICIOS + '/api/ejercicios/' + id;
      return this.http.get(url);
    }
}
