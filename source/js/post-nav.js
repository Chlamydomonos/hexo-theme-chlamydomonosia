(function(){
    let titles = document.getElementById("titles-in-post");
    let postContent = document.getElementById("all-post-contents");
    let cardsMargin = document.getElementsByClassName("cards-margin")[0];
    let postHeader = document.getElementsByClassName("post-header")[0];
    let postNav = document.getElementsByClassName("post-nav")[0];
    let scrollArea = document.getElementsByClassName("post-nav-scroll-area")[0];

    let postElements = [];
    function listChildren(element)
    {
        postElements.push(element);
        if(element.children)
            for(let i = 0; i < element.children.length; i++)
                listChildren(element.children[i]);
    }
    listChildren(postContent);

    function adjustHPosition()
    {
        window.scrollBy(0, -postHeader.getBoundingClientRect().height);
    }

    function isH(element)
    {
        if(element.tagName == "H1")
            return 1;
        if(element.tagName == "H2")
            return 2;
        if(element.tagName == "H3")
            return 3;
        if(element.tagName == "H4")
            return 4;
        if(element.tagName == "H5")
            return 5;
        if(element.tagName == "H6")
            return 6;
        return 0;
    }
    function searchH(from, h)
    {
        let ul = document.createElement("ul");
        for(let i = from; i < postElements.length; i++)
        {
            let element = postElements[i];
            if(isH(element) && isH(element) < h)
                break;
            if(isH(element) == h)
            {
                let li = document.createElement("li");
                let a = document.createElement("a");
                a.href = "#" + element.id;
                a.textContent = element.textContent;
                a.addEventListener("click", function(){window.setTimeout(adjustHPosition, 10);});
                li.appendChild(a);
                if(h < 6)
                {
                    let smallUl = searchH(i + 1, h + 1);
                    li.appendChild(smallUl);
                }
                ul.appendChild(li);
            }
        }
        return ul;
    }

    titles.appendChild(searchH(0, 1));

    function updatePosition()
    {
        if(cardsMargin.getBoundingClientRect().bottom - postHeader.getBoundingClientRect().height < cardsMargin.getBoundingClientRect().height / 2)
        {
            if(postNav.style.position != "fixed")
            {
                let width = $("#profile-card").width();
                let top = postHeader.getBoundingClientRect().height + cardsMargin.getBoundingClientRect().height / 2;
                let left = postNav.getBoundingClientRect().left;
                postNav.style.position = "fixed";
                postNav.style.width = width + "px";
                postNav.style.top = top + "px";
                postNav.style.left = left + "px";
            }
        }
        else
        {
            postNav.style.position = "";
            postNav.style.width = "";
            postNav.style.top = "";
            postNav.style.left = "";
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