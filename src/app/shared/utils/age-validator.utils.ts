import { AbstractControl } from '@angular/forms';

export function ageValidator(minAge: number) {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const birthdate = control.value;
    if (birthdate) {
      const today = new Date();
      const age = today.getFullYear() - birthdate.getFullYear();

      if (age < minAge) {
        return { minAge: true };
      }
    }
    return null;
  };
}
