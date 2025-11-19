export class Alert {

    public id: string | undefined;
    public autoClose!: boolean;
    public type!: AlertType;
    public message!: string;
    public keepAfterRouteChange!: boolean;
    public fade!: boolean;

    constructor(
        init?:Partial<Alert>){
        Object.assign(this, init);
    }
}

export enum AlertType{
    Success,
    Error,
    Info,
    Warning
}
