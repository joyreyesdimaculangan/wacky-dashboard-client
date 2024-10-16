import { FormControl } from "@angular/forms";

export interface Menu { 
  menuID: FormControl<string>,
  name: FormControl<string>,
  description: FormControl<string>,
  image_url: FormControl<string>,
}

export interface MenuValues {
  menuID: string,
  name: string,
  description: string,
  image: string,
}

export interface EditMenuValues {
  menuID: string,
  name: string,
  description: string,
  image_url: string,
}

export interface CreateMenu { 
  name: string,
  description: string,
  image_url: string,
}
