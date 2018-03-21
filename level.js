
class Level {
    constructor() {
        this._columns = []
        this._selectedCell = null;
    }

    checkMatches() {
        
    }

    match(cell1, cell2, direction) {
        if (cell1._layer == cell2._layer) {
            return new Match(cell1._layer, [cell1, cell2], direction);
        } else {
            return null;
        }
    }

    swapSelectedCell(cell) {
        const gem1 = this._selectedCell._sprite;
        const gem2 = cell._sprite;
        const tempX = gem1.position.x;
        const tempY = gem1.position.y;
        gem1.position.set(gem2.position.x, gem2.position.y);
        gem2.position.set(tempX, tempY);
    }
}

class Match {
    constructor(layer, cells, direction) {
        this._layer = layer;
        this._cells = cells;
        this._direction = direction;
    }
}

class Cell {
    constructor(row, column, layer, sprite) {
        this._row = row;
        this._column = column;

        this._layer = layer;
        this._sprite = sprite;
    }
}

var _level = new Level();

function generateLevel(textures) {
    const screenWidth = app.renderer.width;
    const screenHeight = app.renderer.height;

    const rows = 8;
    const columns = rows;

    const gemWidth = screenWidth / columns;
    const gemHeight = screenHeight / rows;

    for (var currentRow = 0; currentRow < rows; ++currentRow) {
        var column = []
        for (var currentCol = 0; currentCol < columns; ++currentCol) {
            const index = Math.floor(Math.random() * textures.length)
            const gem = new PIXI.Sprite(textures[index]);
            gem.width = gemWidth;
            gem.height = gemHeight;
            gem.position.set(currentCol * gemWidth + gemWidth / 2, currentRow * gemHeight + gemHeight / 2);
            gem.interactive = true;
            gem.buttonMode = true;
            gem.anchor.set(0.5);

            app.stage.addChild(gem);

            const cell = new Cell(currentRow, currentCol, index, gem);

            gem.on('pointerdown', onPointerDown(cell));
            gem.on('pointerup', onPointerUp(cell));

            column.push(cell);
        }
        _level._columns.push(column);
    }
}

function onPointerDown(cell) {
    return function(event) {
        _level._selectedCell = cell;
    }
}

function onPointerUp(cell) {
    return function(event) {
        if (_level._selectedCell !== cell) {
            _level.swapSelectedCell(cell);
            _level.checkMatches()
        }
        _level._selectedCell = null;
    }
}
