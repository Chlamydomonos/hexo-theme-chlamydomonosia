(function ()
{
    let coverDiv = document.getElementById("cover-div");
    let coverDivImg = document.getElementById("cover-div-img");
    let canvas = document.createElement("canvas");
    coverDiv.appendChild(canvas);
    canvas.id = "cover-div-fade";
    let coverBlurOuter = document.getElementById("cover-blur-outer");
    let coverBlurInner = document.getElementById("cover-blur-inner");
    let coverBlurImg = document.getElementById("cover-blur-img");

    let blockSize = 8;

    let canvasWidth = 0;
    let canvasHeight = 0;

    let oldRandomFactors = new Array();
    let newRandomFactors = new Array();

    function resizeRandomFactors()
    {
        let blocksWidth = Math.floor(canvasWidth / blockSize) + 3;
        let blocksHeight = Math.floor(canvasHeight / blockSize) + 3;
        oldRandomFactors = new Array();
        newRandomFactors = new Array();
        for(let i = 0; i < blocksWidth; i++)
        {
            oldRandomFactors[i] = new Array();
            newRandomFactors[i] = new Array();
            for(let j = 0; j < blocksHeight; j++)
            {
                oldRandomFactors[i][j] = Math.random() * 0.1;
                newRandomFactors[i][j] = oldRandomFactors[i][j];
            }
        }
    }
    resizeRandomFactors();

    let frames = 0;

    function drawCoverDiv()
    {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let colorRGBA = splitRGBA($(".background-1").css("background-color"));

        function setA(a)
        {
            ctx.fillStyle = "rgba(" + colorRGBA.r + ", " + colorRGBA.g + ", " + colorRGBA.b + ", " + a + ")";
        }

        let blocksWidth = Math.floor(canvasWidth / blockSize) + 3;
        let blocksHeight = Math.floor(canvasHeight / blockSize) + 3;
        let blocksXOffset = Math.floor((Math.floor(canvasWidth) % blockSize) / 2 - blockSize);
        let blocksYOffset = Math.floor((Math.floor(canvasHeight) % blockSize) / 2 - blockSize);

        let blocksSize = Math.min(blocksWidth, blocksHeight);

        frames++;
        if(frames == 120)
        {
            for(let i = 0; i < blocksWidth; i++)
                for(let j = 0; j < blocksHeight; j++)
                {
                    oldRandomFactors[i][j] = newRandomFactors[i][j];
                    newRandomFactors[i][j] = Math.random() * 0.1;
                }
            frames = 0;
        }

        let x, y, a;

        for (let i = 0; i < blocksWidth; i++)
            for (let j = 0; j < blocksHeight; j++)
            {
                y = j / blocksSize * 5;
                if (i < blocksWidth / 2)
                    x = i / blocksSize * 5;
                else
                    x = (blocksWidth - i - 2) / blocksSize * 5;

                a = 0;
                if (x >= 1 && y < 1)
                    a = 1 - y;
                if (x < 1 && y < 1)
                    a = 1 - x * y;
                if (x < 1 && y >= 1)
                    a = 1 - x;
                let randomFactor = newRandomFactors[i][j] * frames / 120 + oldRandomFactors[i][j] * (1 - frames / 120);
                a += randomFactor;
                if (a > 1)
                    a = 1;
                setA(a);
                ctx.fillRect(blocksXOffset + i * blockSize, blocksYOffset + j * blockSize, blockSize, blockSize);
            }
    }

    let resized = 0;

    function resizePostTitle()
    {
        canvasWidth = Math.ceil($("#post-title-and-cover").width());
        canvasHeight = Math.ceil($(coverDivImg).height());
        $(coverDiv).width(canvasWidth);
        $(coverDiv).height(canvasHeight);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        $("#post-title-text").width(canvasWidth);
        let postTitle = document.getElementById("post-title-background");
        postTitle.style.top =  canvasHeight - blockSize * 3 + "px";
        $("#post-title-and-cover").height($(postTitle).position().top + $(postTitle).height());

        coverBlurOuter.style.top = canvasHeight - blockSize * 3 + "px";
        coverBlurOuter.style.left = $("#post-title-background").position().left + "px";
        $(coverBlurOuter).width($(coverDivImg).width());
        $(coverBlurOuter).height(blockSize * 3);
        $(coverBlurInner).width($(coverDivImg).width());
        $(coverBlurInner).height($(coverDivImg).height());
        $(coverBlurImg).width($(coverDivImg).width());
        $(coverBlurImg).height($(coverDivImg).height());
        coverBlurInner.style.top = -$(coverBlurImg).height() + blockSize * 3 + "px";
        resizeRandomFactors();
    }

    window.setInterval(function () { resized--; if (resized == 1) location.reload(); }, 10);
    coverDivImg.addEventListener("load", resizePostTitle);
    window.addEventListener("resize", resizePostTitle);
    window.addEventListener("resize", function () { resized = 10; })
    window.addEventListener("load", resizePostTitle);
    window.setInterval(drawCoverDiv, 16);

}).call(this);