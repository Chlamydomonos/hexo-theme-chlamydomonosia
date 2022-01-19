let yaml = require("js-yaml");

const frontMatterRe = /---([\s\S]*?)---/
const imgRe = /<img[^>]+src="?([^"\s]+)".*?>/

hexo.extend.helper.register("getCoverImg", function (page)
{
    if(!hexo.locals.get("cover_imgs"))
        hexo.locals.set("cover_imgs", {});

    if(hexo.locals.get("cover_imgs")[page.source])
        return hexo.locals.get("cover_imgs")[page.source];

    let hasFrontMatter = page.raw.search(frontMatterRe) != -1;
    let frontMatter = null;
    let firstImg = null;
    let urlFor = this.url_for;

    function getCoverPlaceholder()
    {
        let pageName = page.source;
        pageName = pageName.replace("/", "OF");
        pageName = pageName.replace("\\", "OF");
        if (hexo.theme.config.python_path || hexo.config.python_path)
            return urlFor("/assets/generated_cover/POST_NAME_OF" + pageName + ".png");
        else if (hexo.theme.config.cover_placeholder)
            return hexo.theme.config.cover_placeholder;
        else if (hexo.config.cover_placeholder)
            return hexo.config.cover_placeholder;
        else
            return urlFor("/assets/cover_placeholder.png");
    }

    if (hasFrontMatter)
        frontMatter = yaml.load(RegExp.$1);

    if (frontMatter.cover)
    {
        if (frontMatter.cover == "generate")
        {
            let temp = getCoverPlaceholder();
            hexo.locals.get("cover_imgs")[page.source] = temp;
            return temp;
        }
        else
        {
            hexo.locals.get("cover_imgs")[page.source] = frontMatter.cover;
            return frontMatter.cover;
        }
    }

    let hasImg = page.content.search(imgRe) != -1;
    if (hasImg)
        firstImg = RegExp.$1;

    if (firstImg)
    {
        hexo.locals.get("cover_imgs")[page.source] = firstImg;
        return firstImg;
    }
    else
    {
        let temp = getCoverPlaceholder();
        hexo.locals.get("cover_imgs")[page.source] = temp;
        return temp;
    }
});