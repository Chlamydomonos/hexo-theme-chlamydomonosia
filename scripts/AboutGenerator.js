hexo.extend.generator.register("about", function(locals)
{
    return {
        path: "about/index.html",
        data: hexo.theme.config.about_text,
        layout: "about"
    };
});