import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            // if control is empty return no error
            return null;
          }
      
          // test the value of the control against the regexp supplied
          const valid = regex.test(control.value);
      
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? null : error;
        };
    }

    static match(c: FormGroup): { invalid: true } | null {
        if (c.get('password').value !== c.get('confirmPassword').value) {
            c.get('confirmPassword').setErrors({ noPassswordMatch: true });
            return {invalid: true};
        }
        return null
    }
  
    static birthday(error: ValidationErrors): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
          // if control is empty return no error
          return null;
        }

        //calc age
        var today = new Date();
        var birthDate = new Date(control.value);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        var valid: boolean = false;
        // test the value 16 > 
        if (age >= 16) {
          valid = true;
        }
    
        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
      };
    }

}
