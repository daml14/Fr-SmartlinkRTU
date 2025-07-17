import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function latLngValidator():ValidatorFn{

    return (control: AbstractControl):ValidationErrors | null =>{
        const latLng = control.value;

        if(latLng === null || latLng === undefined || latLng === ''){
            return {'invalidlatLng': true}
        }

        const divLatLng = latLng.split(',');

        const lat = parseFloat(divLatLng[0]);
        const lng = parseFloat(divLatLng[1]);

        if(isNaN(lat) && isNaN(lng)){
            return {'invalidLatLngFormat':true}
        }

        if((lat < -90 || lat > 90) && (lng < -180 || lng > 180)){
            return {'latitudOfRange':true}
        }

        return null


    }

}