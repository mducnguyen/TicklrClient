/**
 * @author ngnmhieu
 * @since 16.05.16
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'base64'})
export class Base64Pipe implements PipeTransform {
    transform(value:string):any {
        return btoa(value);
    }

}

