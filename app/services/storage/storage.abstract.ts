/**
 * @author ngnmhieu
 * @since 11.05.16
 */

export abstract class AbstractStorage {
    length: number;
    [key: string]: any;
    [index: number]: string;
    abstract clear():void;
    abstract getItem(key: string): any;
    abstract key(index: number): string;
    abstract removeItem(key: string): void;
    abstract setItem(key: string, data: string): void;
}
