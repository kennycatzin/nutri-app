import { DetalleAlimento } from './detalleReceta.model';
export class Receta {
    constructor(
        public nombre: string,
        public dificultad: string,
        public tiempo_coccion: number,
        public tiempo_preparacion: string,
        public total_calorias: number,
        public pasos: string,
        public imagen: string,
        public clasificacion_id: string,
        public alimentos: DetalleAlimento[],
        public id?: number
    ) {
    }
}
