let execSync = require("child_process").execSync;
let fs = require("hexo-fs");

hexo.extend.filter.register('after_generate', function ()
{
    let pythonPath = null;
    if (hexo.theme.config.python_path)
        pythonPath = hexo.theme.config.python_path;
    else if (hexo.config.python_path)
        pythonPath = hexo.config.python_path;

    let colorTheme = null;
    if (hexo.theme.config.color_theme)
        colorTheme = hexo.theme.config.color_theme;
    else if (hexo.config.color_theme)
        colorTheme = hexo.config.color_theme;

    if (pythonPath && colorTheme)
    {
        let generatedCoverRe = /\.generated-cover\s*{\s*background-color\s*:(.*);\s*color\s*:(.*);\s*}/;
        let mainCssFileName = hexo.public_dir + "color-themes/" + colorTheme + ".css";
        let generatedCoverColors = -1
        try
        {
            let mainCssContent = fs.readFileSync(mainCssFileName);
            generatedCoverColors = mainCssContent.toString().search(generatedCoverRe);
        }
        catch (e)
        {
            console.warn("Please generate again to generate post cover images");
            return;
        }
        let bgColor = "gray";
        let fgColor = "white";
        if (generatedCoverColors != -1)
        {
            bgColor = RegExp.$1;
            fgColor = RegExp.$2;
        }

        //console.log(hexo.locals.toObject().posts)
        let test = false
        for (let i = 0; i < hexo.locals.toObject().posts.length; i++)
        {
            let post = hexo.locals.toObject().posts.data[i];
            let pageName = post.source;
            pageName = pageName.replace("/", "OF");
            pageName = pageName.replace("\\", "OF");
            let pyOut = execSync(
                pythonPath + " " + hexo.theme_dir + "py_scripts/generate_cover.py" +
                " \"" + pageName + "\"" +
                " \"" + fgColor + "\"" +
                " \"" + bgColor + "\"" +
                " \"" + hexo.public_dir + "\""
            );
            if (pyOut.length > 20)
            {
                console.info('Generated cover for ' + post.source);

                hexo.route.set("assets/generated_cover/POST_NAME_OF" + pageName + ".png",
                    {
                        data: pyOut,
                        modified: true
                    });
            }
            else
            {
                hexo.route.set("assets/generated_cover/POST_NAME_OF" + pageName + ".png",
                    {
                        data: (function (pageName)
                        {
                            return function ()
                            {
                                return fs.createReadStream(hexo.public_dir + "assets/generated_cover/POST_NAME_OF" + pageName + ".png")
                            }
                        })(pageName),
                        modified: false
                    });
            }
        }
    }
});
