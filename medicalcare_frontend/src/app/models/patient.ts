export class Patient {
    constructor(
        public id: number,
        public code: string,
        public first_name: string,
        public last_name: string,
        public date_of_birth: Date,
        public gender: string,
        public home_address: string,
        public office_address: string,
        public phone_number: string,
        public email: string,
        public job: string,
        public emergency_contact_name: string,
        public emergency_contact_phone: string,
        public insurance_type: string,
        public insurance_policy_number: string,
        public insurance_provider: string,
        public insurance_expire: Date,
        public insurance_info: string,
        public medical_history: string
    ){

    }
}
