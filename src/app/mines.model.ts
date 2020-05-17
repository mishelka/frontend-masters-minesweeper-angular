import {Random} from '../shared/random';

export enum GameState {
  PLAYING, FAILED, SOLVED
}

export class Field {
    public readonly tiles: Tile[][];
    state: GameState = GameState.PLAYING;
    private startMillis: number;
    public readonly rowCount;
    public readonly columnCount;
    public readonly mineCount;

    constructor(rowCount: number = 10, columnCount: number = 10, mineCount: number = 10) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.mineCount = mineCount;

        this.tiles = new Array(this.rowCount);
        for (let row = 0; row < this.rowCount; row++) {
            this.tiles[row] = new Array(this.columnCount);
        }

        this.generate();
    }

    public generate(): void {
        this.state = GameState.PLAYING;

        this.generateMines();
        this.fillWithClues();
        this.startMillis = new Date().getMilliseconds();
    }

    private generateMines(): void {
        const random: Random = new Random();
        let minesToSet: number = this.mineCount;

        while (minesToSet > 0) {
            const row: number = random.next(this.rowCount - 1);
            const col: number = random.next(this.columnCount - 1);

            if (!this.tiles[row][col]) {
                this.tiles[row][col] = new Mine();
                minesToSet--;
            }
        }
    }

    private fillWithClues(): void {
        for (let row = 0; row < this.rowCount; row++) {
            for (let col = 0; col < this.columnCount; col++) {
                if (!this.tiles[row][col]) {
                    this.tiles[row][col] = new Clue(this.countNeighbourMines(row, col));
                }
            }
        }
    }

    private countNeighbourMines(row: number, col: number): number {
        let count = 0;

        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            const acurRow = row + rowOffset;

            if (acurRow >= 0 && acurRow < this.rowCount) {
                for (let colOffset = -1; colOffset <= 1; colOffset++) {
                    const acurColumn = col + colOffset;

                    if (acurColumn >= 0 && acurColumn < this.columnCount) {
                        if (this.tiles[acurRow][acurColumn] instanceof Mine) {
                            count++;
                        }
                    }
                }
            }
        }
        return count;
    }

    public getTile(row: number, col: number): Tile {
        return this.tiles[row][col];
    }

    public openTile(row: number, col: number): void {
        const tile: Tile = this.tiles[row][col];

        if (tile.state === TileState.CLOSED) {
            tile.state = TileState.OPEN;
            if (tile instanceof Mine) {
                this.state = GameState.FAILED;
                return;
            }
            if (tile instanceof Clue) {
                if ((tile as Clue).value === 0) {
                    this.openNeighbouringTiles(row, col);
                }
            }
            if (this.isSolved()) {
                this.state = GameState.SOLVED;
            }
        }
    }

    private openNeighbouringTiles(row: number, col: number): void {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            const acurRow = row + rowOffset;
            if (acurRow >= 0 && acurRow < this.rowCount) {
                for (let colOffset = -1; colOffset <= 1; colOffset++) {
                    const acurColumn = col + colOffset;
                    if (acurColumn >= 0 && acurColumn < this.columnCount) {
                        this.openTile(acurRow, acurColumn);
                    }
                }
            }
        }
    }

    markTile(row: number, col: number): void {
        const tile: Tile = this.tiles[row][col];

        if (tile.state === TileState.CLOSED) {
            tile.state = TileState.MARKED;
        } else if (tile.state === TileState.MARKED) {
            tile.state = TileState.CLOSED;
        }
    }

    private isSolved(): boolean {
        return this.rowCount * this.columnCount - this.mineCount === this.getNumberOfOpen();
    }

    public getNumberOfOpen(): number {
        let count = 0;
        for (let row = 0; row < this.rowCount; row++) {
            for (let col = 0; col < this.columnCount; col++) {
                if (this.tiles[row][col].state === TileState.OPEN) {
                    count++;
                }
            }
        }
        return count;
    }

    public getScore(): number {
        if (this.state === GameState.SOLVED) {
            const seconds = Math.ceil((new Date().getMilliseconds() - this.startMillis) / 1000);
            return this.rowCount * this.columnCount * 3 - seconds;
        }
        return 0;
    }
}

export enum TileState {
    OPEN, CLOSED, MARKED
}

export class Tile {
    public state: TileState = TileState.CLOSED;
}

export class Clue extends Tile {
    constructor(public readonly value: number) {
        super();
        this.value = value;
    }
}

export class Mine extends Tile {
}
