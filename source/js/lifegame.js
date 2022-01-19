(function () {
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.id = "life-game";

    let color = splitRGBA($("#life-game").css("color"));
    let cellSize = 4;

    let colors = new Array(11);
    for(let i = 0; i < 11; i++)
    {
        let temp = color;
        temp.a = i / 10.0;
        colors[i] = genRGBA(temp);
    }

    let oldCells = null;
    let cells = null;
    let cellsTimes = null;
    let cellsWidth = 0;
    let cellsHeight = 0;

    //------------------------------------------------------------------------------

    function setCells()
    {
        let winW = window.innerWidth;
        let winH = window.innerHeight;

        canvas.width = winW;
        canvas.height = winH;
        canvas.style.top = "0px";
        canvas.style.left = "0px";

        cellsWidth = Math.floor(winW / cellSize);
        cellsHeight = Math.floor(winH / cellSize);

        cells = new Array(cellsWidth);
        oldCells = new Array(cellsWidth);
        cellsTimes = new Array(cellsWidth);
        for(let i = 0; i < cellsWidth; i++)
        {
            cells[i] = new Array(cellsHeight);
            oldCells[i] = new Array(cellsHeight);
            cellsTimes[i] = new Array(cellsHeight);
            for(let j = 0; j < cellsHeight; j++)
            {
                cells[i][j] = Math.random() >= 0.25;
                oldCells[i][j] = cells[i][j];
                cellsTimes[i][j] = 0;
            }
        }
    }
    setCells();
    window.addEventListener("resize", setCells);

    //------------------------------------------------------------------------------

    function calcNeighbors(i, j)
    {
        let neighborCount = 0;
        if(i - 1 >= 0)
        {
            if(j - 1 >= 0)
                neighborCount += oldCells[i - 1][j - 1];

            neighborCount += oldCells[i - 1][j];

            if(j + 1 < cellsHeight)
                neighborCount += oldCells[i - 1][j + 1];
        }

        if(j - 1 >= 0)
            neighborCount += oldCells[i][j - 1];
        if(j + 1 < cellsHeight)
            neighborCount += oldCells[i][j + 1];

        if(i + 1 < cellsWidth)
        {
            if(j - 1 >= 0)
                neighborCount += oldCells[i + 1][j - 1];

            neighborCount += oldCells[i + 1][j];

            if(j + 1 < cellsHeight)
                neighborCount += oldCells[i + 1][j + 1];
        }

        return neighborCount;
    }

    function updateCells()
    {
        for(let i = 0; i < cellsWidth; i++)
            for(let j = 0; j < cellsHeight; j++)
                oldCells[i][j] = cells[i][j];

        for(let i = 0; i < cellsWidth; i++)
        {
            for(let j = 0; j < cellsHeight; j++)
            {
                let neighborCount = calcNeighbors(i, j);

                cells[i][j] = ((oldCells[i][j] && neighborCount == 2) || neighborCount == 3);

                if(cells[i][j])
                    cellsTimes[i][j] = 5;
            }
        }
    }

    //------------------------------------------------------------------------------

    function drawCells()
    {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < cellsWidth; i++)
        {
            for(let j = 0; j < cellsHeight; j++)
            {
                if(!cells[i][j] && cellsTimes[i][j] > 0)
                {
                    ctx.fillStyle = colors[cellsTimes[i][j]];
                    ctx.fillRect((i + 0.25) * cellSize, (j + 0.25) * cellSize, 0.5 * cellSize, 0.5 * cellSize);
                    cellsTimes[i][j]--;
                }
                else if(cells[i][j])
                {
                    ctx.fillStyle = colors[5];
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                    ctx.fillStyle = colors[10];
                    ctx.fillRect((i + 0.25) * cellSize, (j + 0.25) * cellSize, 0.5 * cellSize, 0.5 * cellSize);
                }
            }
        }
    }

    let frames = 0;
    function handleFrame()
    {
        frames++;
        if(frames == 5)
        {
            frames = 0;
            updateCells();
        }
        if(!document.hidden)
            drawCells();
    }

    window.setInterval(handleFrame, 16);

    //------------------------------------------------------------------------------

    let mouseX = 0;
    let mouseY = 0;

    function getMousePos(event)
    {
        let e = event || window.event;
        mouseX = Math.floor(e.clientX / cellSize);
        mouseY = Math.floor(e.clientY / cellSize);
    }

    window.addEventListener("mousemove", getMousePos);

    function randomCells()
    {
        for (let i = -8; i <= 8; i++)
        {
            for (let j = -8; j <= 8; j++)
            {
                let x = mouseX + i;
                let y = mouseY + j;
                if (x >= 0 && x < cellsWidth && y >= 0 && y < cellsHeight && i * i + j * j <= 64)
                {
                    oldCells[x][y] = Math.random() >= 0.5;
                    cells[x][y] = oldCells[x][y];
                }
            }
        }
    }

    function randomCellsTouch(event)
    {
        let e = event || window.event;
        mouseX = Math.floor(e.clientX / cellSize);
        mouseY = Math.floor(e.clientY / cellSize);
        randomCells();
    }

    canvas.onclick = randomCells;

    canvas.ontouchend = randomCellsTouch;

    let emptyElements = document.getElementsByClassName("without-content");

    for (let i = 0; i < emptyElements.length; i++)
    {
        emptyElements[i].onclick = randomCells;
        emptyElements[i].ontouchend = randomCellsTouch;
    }

}).call(this);