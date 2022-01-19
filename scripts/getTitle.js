hexo.extend.helper.register("getTitle", function (page, inHead)
{
    let theme = hexo.theme.config;
    let config = hexo.config;

    let pageTitle = "";
    let blogTitle = "";
    let blogSubtitle = "";

    if(theme.title)
                blogTitle = theme.title;
            else
                blogTitle = config.title;

            if(theme.subtitle)
                blogSubtitle = theme.subtitle;
            else
                blogSubtitle = config.subtitle;

            if(page.archive)
            {
                pageTitle = this.__("archive");
                if(page.year)
                    pageTitle += " - " + page.year;
                if(page.month)
                {
                    if(page.month < 10)
                        pageTitle += ".0" + page.month;
                    else
                        pageTitle += "." + page.month;
                }
                if(inHead)
                    pageTitle += " | " + blogTitle;
            }
            else if(page.category)
                pageTitle = this.__("category") + " - " + page.category + (inHead ? (" | " + blogTitle) : "");
            else if(page.tag)
                pageTitle = this.__("tag") + " - " + page.tag + (inHead ? (" | " + blogTitle) : "");
            else if(page.title)
                pageTitle = page.title + (inHead ? (" | " + blogTitle) : "");
            else
            {
                pageTitle = blogTitle;
                if(theme.subtitle)
                    pageTitle += " - " + blogSubtitle;
            }
    return pageTitle;
});