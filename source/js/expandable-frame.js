(function ()
{
    let translations = document.getElementById("chlamydomonos-translations");
    let expandTranslation = translations.getElementsByClassName("tr-expand")[0].innerHTML;
    let retractTranslation = translations.getElementsByClassName("tr-retract")[0].innerHTML;

    let expandableObjects = document.getElementsByClassName("expandable-content");

    function expand(obj, expandButton, retractButton)
    {
        return function()
        {
            obj.hidden = false;
            expandButton.hidden = true;
            retractButton.hidden = false;
        }
    }

    function retract(obj, expandButton, retractButton)
    {
        return function()
        {
            obj.hidden = true;
            expandButton.hidden = false;
            retractButton.hidden = true;
        }
    }

    for(let i = 0; i < expandableObjects.length; i++)
    {
        let obj = expandableObjects[i];
        let newObj = document.createElement("DIV");
        newObj.className = "expandable-frame";
        obj.parentNode.insertBefore(newObj, obj);
        obj.parentNode.removeChild(obj);
        newObj.appendChild(obj);
        obj.hidden = true;

        let expandButton = document.createElement("DIV");
        expandButton.innerHTML = expandTranslation;
        newObj.insertBefore(expandButton, obj);

        let retractButton = document.createElement("DIV");
        retractButton.innerHTML = retractTranslation;
        newObj.appendChild(retractButton);

        expandButton.className = "expand-button";
        retractButton.className = "retract-button";

        expandButton.addEventListener("click", expand(obj, expandButton, retractButton));
        retractButton.addEventListener("click", retract(obj, expandButton, retractButton));

        retractButton.hidden = true;
    }
}).call(this);