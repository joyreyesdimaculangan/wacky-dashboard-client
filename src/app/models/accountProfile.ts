import { FormControl } from "@angular/forms";

export interface AccountProfile {
    accountProfileID: FormControl<string>,
    name: FormControl<string>,
    contactNo: FormControl<string>,
    address: FormControl<string>,
}
