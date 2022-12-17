import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function matchValidator(
    matchTo: string,
    reverse?: boolean
): ValidatorFn {
    return (control: AbstractControl):
        ValidationErrors | null => {
        if (control.parent) {
            if (reverse) {
                const c = (control.parent?.controls as any)[matchTo]
                // @ts-ignore
                as
                AbstractControl;
                if (c) {
                    c.updateValueAndValidity();
                }
                return null;
            }
        }
        return !!control.parent &&
        !!control.parent.value &&
        control.value ===
        (control.parent?.controls as any)[matchTo].value
            ? null
            : { matching: true };
    };
}