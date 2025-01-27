import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appEnterSubmit]',
  standalone: true,
})
export class EnterSubmitDirective { 
  @Output() enterSubmit = new EventEmitter<void>();

  @HostListener('keydown.enter', ['$event'])
  onEnterPress(event: KeyboardEvent) {
    event.preventDefault();
    if (event.target instanceof HTMLElement && event.target.tagName !== 'TEXTAREA') {
      this.enterSubmit.emit();
    }
  }
}
