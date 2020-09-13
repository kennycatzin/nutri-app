import { DetPrograma } from './detallePrograma.model';
export class Programa {
    constructor(
        public nombre: string,
        public notas: string,
        public repeticiones: number,
        public vueltas: number,
        public descanso: number,
        public det_programa: DetPrograma[],
        public id?: number
    ) {
    }
}
