
import { AnaClinico } from './anaclinico.model';
import { Dieta } from './dieta.model';

export class Sesion {
    constructor(
        public sesion: number,
        public imc: number,
        public peso: number,
        public pctgrasa: number,
        public fecha: string,
        public masa_muscular: number,
        public metabolismo_basal: number,
        public gasto_calorico: number,
        public frecuencia_cardiaca: string,
        public tipo_cuerpo: string,
        public paciente_id: number,
        public ana_clinico: AnaClinico,
        public dieta: Dieta,
        public id?: number
    ) {
    }
}
