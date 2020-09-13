import { Comida } from './comida.model';
export class Dieta {
    constructor(
        public notas: string,
        public totcalorias: number,
        public comidas: Comida[],
        public id?: number
    ) {
    }
}
