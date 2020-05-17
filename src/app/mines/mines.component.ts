import { Component } from '@angular/core';
import {Field, GameState} from '../mines.model';

@Component({
  selector: 'mines-mines',
  templateUrl: './mines.component.html',
  styleUrls: ['./mines.component.css']
})
export class MinesComponent {
  field: Field = new Field(10, 10, 10);
  gameState = GameState;

  newGame(): void {
    this.field = new Field(10, 10, 10); // field starts a new game automatically
  }
}
