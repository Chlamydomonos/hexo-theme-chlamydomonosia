function jumpToPage(button)
{
    let input = document.getElementById("page-num-" + button.getAttribute("componentid"));
    let pageNum = input.value;
    let pageComponent = document.getElementsByClassName("page-component")[0];
    let elementsInPageComponent = pageComponent.children;
    for(let i = 0; i < elementsInPageComponent.length; i++)
    {
        if(elementsInPageComponent[i].innerHTML && elementsInPageComponent[i].innerHTML == "1")
        {
            if(elementsInPageComponent[i].tagName == "A")
                window.location.href = elementsInPageComponent[i].href + (pageNum != 1 ? ("page/" + pageNum) : "");
            else
                window.location.href = window.location.href + (pageNum != 1 ? ("page/" + pageNum) : "");
        }
    }
}