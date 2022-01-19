(function(){
    let bg2 = splitRGBA($("#get-bg-2").css("background-color"));
    let staticIndexHeader = document.getElementById("static-index-header");
    let blurContainer = document.getElementById("index-header-blur-container");
    let blurFilter = document.getElementById("index-header-blur-filter");
    let absoluteIndexHeader = document.getElementById("absolute-index-header");
    let fixedIndexHeader = document.getElementById("fixed-index-header");
    let blogSubtitle = document.getElementById("full-blog-subtitle").innerText;
    let subtitleSpan = document.getElementById("blog-subtitle");
    let typeEnabled = document.getElementById("type-subtitle");
    let subtitleLen = blogSubtitle.length;
    let currentSubtitleLen = 0;
    let addingSubtitleLen = true;
    let coolDownTime = 0;
    let maxCoolDownTime = 3;

    function setBlurSize()
    {
        blurContainer.style.height = fixedIndexHeader.getBoundingClientRect().height + "px";
        blurContainer.style.top = staticIndexHeader.getBoundingClientRect().bottom - blurContainer.getBoundingClientRect().height + "px";
        blurFilter.style.height = blurContainer.style.height;
        absoluteIndexHeader.style.top = blurContainer.getBoundingClientRect().height - absoluteIndexHeader.getBoundingClientRect().height + "px";
    }

    setBlurSize();
    window.addEventListener("resize", setBlurSize);

    function scrollHeader()
    {
        let headerTop = blurContainer.getBoundingClientRect().top;
        let headerTopRatio = headerTop / blurContainer.getBoundingClientRect().height;
        if(headerTop > 0)
            fixedIndexHeader.style.top = headerTop + "px";
        else
            fixedIndexHeader.style.top = "0px";
        if(headerTopRatio > 0)
            bg2.a = 0.5;
        else if(headerTopRatio > -1)
            bg2.a = -headerTopRatio / 2 + 0.5;
        else
            bg2.a = 1;
        fixedIndexHeader.style.backgroundColor = genRGBA(bg2);
    }

    scrollHeader();
    window.addEventListener("scroll", scrollHeader);

    function typeSubtitle()
    {
        if(coolDownTime > 0)
        {
            coolDownTime--;
            return;
        }

        if(addingSubtitleLen)
        {
            currentSubtitleLen++;
            if(currentSubtitleLen == subtitleLen)
            {
                addingSubtitleLen = false;
                coolDownTime = maxCoolDownTime;
            }
        }
        else
        {
            currentSubtitleLen--;
            if(currentSubtitleLen == 0)
            {
                addingSubtitleLen = true;
                coolDownTime = maxCoolDownTime;
            }
        }
        let temp = "";
        for(let i = 0; i < currentSubtitleLen; i++)
            temp += blogSubtitle.charAt(i);
        subtitleSpan.innerHTML = temp;
    }

    if(typeEnabled)
        window.setInterval(typeSubtitle, 150);

}).call(this);