import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private _dbouncer: Subject<string> = new Subject()
  private _dbouncerSuscription?: Subscription

  @Input() public placeholder: string = ''
  @Input() public value: string = ''

  @Output() public onEnter: EventEmitter<string> = new EventEmitter()
  @Output() public onDebounce: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
    this._dbouncerSuscription = this._dbouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe((value) => {
        this.onDebounce.emit(value)
      })
  }


  ngOnDestroy(): void {
    this._dbouncerSuscription?.unsubscribe()
  }


  sendTerm(term: string): void {
    this.onEnter.emit(term)
  }


  onKeyPress(term: string): void {
    this._dbouncer.next(term)
  }
}
