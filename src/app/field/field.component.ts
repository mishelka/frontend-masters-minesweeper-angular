import {Component, Input} from '@angular/core';
import {Field} from '../mines.model';

@Component({
  selector: 'mines-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {
  @Input() field: Field = new Field(10, 10, 10);
}
