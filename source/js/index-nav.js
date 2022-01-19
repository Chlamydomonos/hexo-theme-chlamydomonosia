(function ()
{
    let cardsMargin = document.getElementsByClassName("cards-margin")[0];
    let indexNav = document.getElementsByClassName("index-nav")[0];
    let scrollArea = indexNav.getElementsByClassName("scroll-area")[0];
    let indexHeader = document.getElementById("fixed-index-header");

    function updatePosition()
    {
        if(cardsMargin.getBoundingClientRect().bottom - indexHeader.getBoundingClientRect().height < cardsMargin.getBoundingClientRect().height / 2)
        {
            if(indexNav.style.position != "fixed")
            {
                let width = $("#profile-card").width();
                let top = indexHeader.getBoundingClientRect().height + cardsMargin.getBoundingClientRect().height / 2;
                let left = indexNav.getBoundingClientRect().left;
                indexNav.style.position = "fixed";
                indexNav.style.width = width + "px";
                indexNav.style.top = top + "px";
                indexNav.style.left = left + "px";
            }
        }
        else
        {
            indexNav.style.position = "";
            indexNav.style.width = "";
            indexNav.style.top = "";
            indexNav.style.left = "";
        }
        let wHeight = window.innerHeight;
        if(document.getElementById("page-footer"))
        {
            wHeight = document.getElementById("page-footer").getBoundingClientRect().top;
            if(wHeight > window.innerHeight)
                wHeight = window.innerHeight;
        }
        $(scrollArea).height(wHeight - cardsMargin.getBoundingClientRect().height / 2 - scrollArea.getBoundingClientRect().top);
    }
    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
}).call(this);