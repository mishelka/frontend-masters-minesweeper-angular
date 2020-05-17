import {Component, Input} from '@angular/core';
import {Clue, Field, Tile, TileState} from '../mines.model';

@Component({
  selector: 'mines-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {
  @Input() field: Field;
  @Input() tile: Tile;

  getStyle(): any {
    let figName = (this.tile.state === TileState.CLOSED) ? 'closed' : 'marked';
    if (this.tile.state === TileState.OPEN) {
      if (this.tile instanceof Clue && (this.tile as Clue).value >= 0) {
        figName = 'open' + (this.tile as Clue).value;
      } else {
        figName = 'mine';
      }
    }
    return {
      background: `url(/assets/images/${figName}.png)`
    };
  }
}
