import { DetalleAlimento } from './detalleReceta.model';
export class Comida {
    constructor(
        public nombre: string,
        public calorias: number,
        public notas: string,
        public det_comidas: DetalleAlimento[],
        public id?: number
    ) {
    }
}
