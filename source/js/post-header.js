(function(){
    let postHeader = document.getElementsByClassName("post-header")[0];
    let titleInHeader = document.getElementById("post-title-in-header");
    let postTitle = document.getElementById("post-title-text");

    let postTitleTop = 0;
    let postTitleHeight = postTitle.getBoundingClientRect().height - document.getElementsByClassName("post-tags")[0].getBoundingClientRect().height;

    function scrollPostHeader()
    {
        postTitleTop = postTitle.getBoundingClientRect().top - postHeader.clientHeight;
        if(postTitleTop > 0)
            titleInHeader.style.opacity = 0;
        else if(postTitleTop > -postTitleHeight)
            titleInHeader.style.opacity = -(postTitleTop / postTitleHeight);
        else
            titleInHeader.style.opacity = 1;
    }

    scrollPostHeader();
    window.addEventListener("scroll", scrollPostHeader);
}).call(this);