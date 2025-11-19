import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";

export function dateLessThanTodayValidator(): ValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> =>{
        const inputDate = new Date(control.value);
        const today = new Date();

        inputDate.setHours(0, 0, 0, 0);

        today.setHours(0, 0, 0, 0);

        if (inputDate >= today){
            return of ({dateLessThanTodayValidator: true})
        }
        return of(null);
    }
}
