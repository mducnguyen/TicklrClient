/**
 * @author ngnmhieu
 * @since 19.05.16
 */
import {AfterViewChecked, Input, ElementRef, ViewChild, Component, forwardRef, provide} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/common";
const TIME_INPUT_VALUE_ACCESSOR = provide(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => DateTimeInput),
        multi: true
    });

declare var jQuery;

/**
 * Datetime UI Component
 * Parameters:
 *  - use [id] or [class] to target the wrapper element of the component. E.g: <datetime-input [id]="'myDateTime'"></datetime-input>
 *
 */
@Component({
    selector: 'datetime-input',
    templateUrl: 'app/event/templates/datetime.input.html',
    providers: [TIME_INPUT_VALUE_ACCESSOR],
    host: {
        '(document:click)': 'onClick($event)',
    },
})
export class DateTimeInput implements ControlValueAccessor, AfterViewChecked {

    @ViewChild('hourInput') hourInput:ElementRef;

    @ViewChild('minuteInput') minuteInput:ElementRef;

    @ViewChild('dateInput') dateInput:ElementRef;

    // function to call when the value of the input changes
    private _onChange;

    // function to call when the input is touched
    private _onTouch;

    /** @internal **/

    private _date:number;

    private _month:number;

    private _year:number;

    private _hour:number;

    private _minute:number;

    // id of the wrapper element
    @Input() id:string;

    // class of the wrapper element
    @Input('class') customClass:string;

    // 'date', 'hour', 'minute' (not one of those mean nothing is active)
    public activePart:string;

    get date():string {
        return (this._date < 10 ? "0" : "") + this._date;
    }

    get month():string {
        let month = this._month + 1; // month in js 0..11
        return (month < 10 ? "0" : "") + month;
    }

    get year():string {
        return "" + this._year;
    }

    get hour():string {
        return (this._hour < 10 ? "0" : "") + this._hour;
    }

    get normalizedDateStr():string {
        return `${this.date}.${this.month}.${this.year}`;
    }

    // binds with the input in the view
    public dateInputStr:string;


    ngAfterViewChecked() {
        jQuery(this.dateInput.nativeElement).datepicker({
            dateFormat: "dd.mm.yy",
            onSelect: (val) => {
                this.dateInputStr = val;
                this.onDateChange()
            }
        });
    }

    constructor() {
        this._date = this._month = this._year = this._hour = this._minute = 0;
        this.id = "ticklr-datetime-" + this._randomId();
    }

    /**
     * @returns {Date} date value of this input control
     */
    private _getDate():Date {
        return new Date(this._year, this._month, this._date, this._hour, this._minute);
    }

    /**
     * Set new hour and trigger change event
     * @param hour
     */
    private _setHour(hour:number) {
        this._hour = hour;
        this._onChange(this._getDate());
    }

    /**
     * Set new minute and trigger change event
     * @param minute
     */
    private _setMinute(minute:number) {
        this._minute = minute;
        this._onChange(this._getDate());
    }

    /**
     * Bring date input into correct format when date input field lose focus
     */
    public normalizeDateInput() {
        this.dateInputStr = this.normalizedDateStr;
    }

    /**
     * Update internal date object when date input field changes
     */
    public onDateChange() {

        let date:Date = this.parseDate(this.dateInputStr);

        if (date == null) {
            date = jQuery(this.dateInput.nativeElement).datepicker('getDate');
        }

        this._year = date.getFullYear();
        this._month = date.getMonth();
        this._date = date.getDate();

        // notify changes
        this._onChange(this._getDate());
    }

    /**
     * @param dateStr
     * @return a Date object if dateStr is a valid date of form dd.mm.yyyy, else null
     */
    private parseDate(dateStr:string):boolean {

        let regex = /^(\d{1,2})\.(\d{1,2}).(\d{4})$/;
        let match = regex.exec(dateStr);
        if (match == null)
            return null;

        let year = +match[3];
        let month = (+match[2]) - 1; // month in js 0..11
        let day = +match[1];

        let date = new Date(year, month, day);

        if (date.getDate() == day && date.getMonth() == month && date.getFullYear() == year)
            return date;

        return null;
    }


    /**
     * @param $event
     */
    public onHourInput($event:KeyboardEvent) {
        let digit:number = this._getDigit($event);
        if (digit != -1) {
            let newHour = Number(String(this._hour) + digit);
            this._setHour(newHour < 24 ? newHour : digit);
        }
        $event.preventDefault();
    }

    /**
     * @param $event
     */
    public onMinuteInput($event:KeyboardEvent) {
        let digit:number = this._getDigit($event);
        if (digit != -1) {
            let newMinute = Number(String(this._minute) + digit);
            this._setMinute(newMinute < 60 ? newMinute : digit);
        }
        $event.preventDefault();
    }

    /**
     * @param $event
     * @return {number} 0..9 if a digit is entered, else -1
     */
    private _getDigit($event:KeyboardEvent):number {

        if (48 <= $event.charCode && $event.charCode <= 57)
            return $event.charCode - 48;

        return -1;
    }

    get minute():string {
        return (this._minute < 10 ? "0" : "") + this._minute;
    }

    /**
     * @return a random id for this input control
     */
    private _randomId():string {
        return Math.floor(Math.random() * 10000).toString();
    }

    /**
     * turn on edit mode for a particular field
     * @param field (hour|minute|date)
     */
    public edit(field:string):void {

        this.activePart = field;

        switch (field) {
            case 'hour':
                this.hourInput.nativeElement.focus();
                break;
            case 'minute':
                this.minuteInput.nativeElement.focus();
        }

    }

    /**
     * Get called when a mouse click event is fired
     * @param $event
     */
    public onClick($event:MouseEvent) {
        if (!this._clickedInsideInput($event)) {
            this.activePart = '';
        }
    }

    /**
     * @param $event
     * @return true if the target of the click event is inside this input control
     */
    private _clickedInsideInput($event):boolean {
        let parent = $event.srcElement;
        while (parent != null) {
            if (parent.id == this.id)
                return true;
            else
                parent = parent.parentNode;
        }

        return false;
    }

    writeValue(obj:any):void {
        if (obj !== undefined && obj !== null) {
            let date = obj as Date;
            this._date = date.getDate();
            this._month = date.getMonth();
            this._year = date.getFullYear();
            this._hour = date.getHours();
            this._minute = date.getMinutes();
            this.normalizeDateInput();
        }
    }

    registerOnChange(fn:any):void {
        this._onChange = fn;
    }

    registerOnTouched(fn:any):void {
        this._onTouch = fn;
    }
}
