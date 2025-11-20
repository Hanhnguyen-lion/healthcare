export class Medicine {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public price: number,
        public input_date: Date,
        public expire_date: Date
    ){

    }
}
