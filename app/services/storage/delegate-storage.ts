import {AbstractStorage} from "./storage.abstract";
/**
 * @author ngnmhieu
 * @since 12.05.16
 */

/**
 * Proxy for the underlying localStorage
 */
export class DelegateStorage extends AbstractStorage {

    /**
     * @param _nativeStorage browser's native implementation
     */
    constructor(private _nativeStorage:Storage) {
        super();
    }

    clear():void {
        this._nativeStorage.clear();
    }

    getItem(key:string):any {
        return this._nativeStorage.getItem(key);
    }

    key(index:number):string {
        return this._nativeStorage.getItem(index);
    }

    removeItem(key:string):void {
        this._nativeStorage.removeItem(key);
    }

    setItem(key:string, data:string):void {
        this._nativeStorage.setItem(key, data);
    }

}
