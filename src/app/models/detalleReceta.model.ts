export class DetalleAlimento {
    constructor(
        public cantidad: number,
        public unidad_id: number,
        public unidad: string,
        public receta_id: number,
        public alimento: string,
        public alimento_id: number,
        public calorias: number,
        public id?: number
    ) {
    }
}
