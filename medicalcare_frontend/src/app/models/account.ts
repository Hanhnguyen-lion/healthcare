export class Account {
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public first_name: string,
        public last_name: string,
        public dob: Date,
        public gender: string,
        public account_type: string,
        public address: string,
        public phone: string
    ){

    }
}
