hexo.extend.helper.register("getArchives", function ()
{
    if(hexo.locals.get("recent_archives"))
        return hexo.locals.get("recent_archives");

    function getName(year, month)
    {
        let out = year.toString() + '.';
        if (month < 10)
            out += "0" + month.toString();
        else
            out += month.toString();
        return out;
    }

    function getLink(year, month)
    {
        let archiveDir = hexo.theme.config.archive_dir;
        if (!archiveDir)
            archiveDir = hexo.config.archive_dir;
        if (!archiveDir)
            archiveDir = "archives";
        let out = "/" + archiveDir + "/" + year.toString() + "/";

        if (month < 10)
            out += "0" + month.toString();
        else
            out += month.toString();
        return out + "/";
    }

    let allPosts = hexo.locals.get('posts');
    let archives = {};
    let out = []
    allPosts.forEach(function (post, i)
    {
        let year = post.date.year();
        let month = post.date.month();
        if (!archives[year.toString()])
            archives[year.toString()] = {};
        if (!archives[year.toString()][month.toString()])
            archives[year.toString()][month.toString()] = {
                "year": year,
                "month": month
            };
    });
    for (let i in archives)
    {
        for (let j in archives[i])
        {
            out.push({
                "year": archives[i][j].year,
                "month": archives[i][j].month + 1,
                "name": getName(archives[i][j].year, archives[i][j].month + 1),
                "link": getLink(archives[i][j].year, archives[i][j].month + 1)
            });
        }
    }

    out = out.sort(function (a, b)
    {
        if(a.year == b.year)
        {
            return b.month - a.month;
        }
        return b.year - a.year;
    });

    hexo.locals.set("recent_archives", out);
    return out;
});