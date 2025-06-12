import { Directive, Input, Output, HostListener, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(
    private el: ElementRef
  ) { }

  @Output() clickOutside = new EventEmitter<void>();

  @HostListener('document:mousedown', ['$event.target'])
  public onClick(target: any) {

    if (!this.el.nativeElement.contains(target)) {
      //console.log('click outside');

      this.clickOutside.emit();
    }
  }
}
