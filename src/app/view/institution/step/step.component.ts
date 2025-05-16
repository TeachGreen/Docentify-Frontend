import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent {
  @Input() steps: { label: string; completed: boolean }[] = [];
  
  @Output() stepClick = new EventEmitter<number>();

  onClick(index: number): void {
    this.stepClick.emit(index);
  }

}
