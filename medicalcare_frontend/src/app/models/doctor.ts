export class Doctor {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public phone: string,
        public email: string,
        public gender: string,
        public quanlification: string,
        public job_specification: string,
        public hospital_id: number,
        public department_id: number
    ){

    }
}
