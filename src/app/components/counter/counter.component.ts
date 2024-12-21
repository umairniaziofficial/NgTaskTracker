import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  counterValue = signal(0);
  handleDecrease(){
    this.counterValue.update(value => value -1);
  }
  handleReset(){
    this.counterValue.update(value => 0)
  }
  handleIncrease(){
    this.counterValue.update(value =>  value+1);

  }
}
