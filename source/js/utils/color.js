function splitRGBA(color)
{
    let re = /rgb\s*\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/
    let re2 = /rgba\s*\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/

    let hasA = false;

    let rst = color.search(re);
    if (rst == -1) {
        rst = color.search(re2);
        hasA = true;
    }

    let r1 = RegExp.$1;
    let g1 = RegExp.$2;
    let b1 = RegExp.$3;
    let a1 = "1";
    if (hasA)
        a1 = RegExp.$4;

    r1 = parseInt(r1);
    g1 = parseInt(g1);
    b1 = parseInt(b1);
    a1 = parseFloat(a1);

    return {r: r1, g: g1, b: b1, a: a1};
}

function genRGBA(color)
{
    return "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")";
}
