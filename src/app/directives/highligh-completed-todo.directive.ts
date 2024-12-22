import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]'
})
export class HighlightCompletedTodoDirective implements OnChanges {
  @Input() isCompleted: boolean = false;
  private el: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCompleted']) {
      this.applyHighlight();
    }
  }

  private applyHighlight(): void {
    this.el.style.backgroundColor = this.isCompleted ? '#2A3439' : '';
  }
}
