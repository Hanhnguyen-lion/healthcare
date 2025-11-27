import { formatDate } from "@angular/common";

export class Helper{
  
  formatDateYYYYMMDD(value: Date, locale: string): string {
    return formatDate(value, "yyyy-MM-dd", locale);
  }

}
