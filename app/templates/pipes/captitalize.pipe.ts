/**
 * @author ngnmhieu
 * @since 16.05.16
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
    transform(value:string):any {
        return value.charAt(0).toUpperCase() + value.substring(1);
    }

}

