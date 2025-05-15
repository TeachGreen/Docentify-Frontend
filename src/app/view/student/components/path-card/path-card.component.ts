import { Component, Input } from '@angular/core';
import { Path } from '../../../../models/Path';

@Component({
  selector: 'path-card',
  templateUrl: './path-card.component.html',
  styleUrl: './path-card.component.css'
})
export class PathCardComponent {
  @Input() path!: Path;

  trimIfTooLong(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }
}
