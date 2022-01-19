import re

from typing import Tuple

rgb_re = re.compile(r'\s*rgb\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)\s*')
rgba_re = re.compile(r'\s*rgba\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)\s*')
hsl_re = re.compile(r'\s*hsl\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)\s*')
hsla_re = re.compile(r'\s*hsla\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)\s*')
hex_re = re.compile(r'\s*#([0-9a-fA-F]{6})\s*')
hexa_re = re.compile(r'\s*#([0-9a-fA-F]{8})\s*')
shex_re = re.compile(r'\s*#([0-9a-fA-F]{3})\s*')
shexa_re = re.compile(r'\s*#([0-9a-fA-F]{4})\s*')
color_name_re = re.compile(r'\s*(\S*)\s*')

colors = {
    "aliceblue": "#F0F8FF",
    "antiquewhite": "#FAEBD7",
    "aqua": "#00FFFF",
    "aquamarine": "#7FFFD4",
    "azure": "#F0FFFF",
    "beige": "#F5F5DC",
    "bisque": "#FFE4C4",
    "black": "#000000",
    "blanchedalmond": "#FFEBCD",
    "blue": "#0000FF",
    "blueviolet": "#8A2BE2",
    "brown": "#A52A2A",
    "burlywood": "#DEB887",
    "cadetblue": "#5F9EA0",
    "chartreuse": "#7FFF00",
    "chocolate": "#D2691E",
    "coral": "#FF7F50",
    "cornflowerblue": "#6495ED",
    "cornsilk": "#FFF8DC",
    "crimson": "#DC143C",
    "cyan": "#00FFFF",
    "darkblue": "#00008B",
    "darkcyan": "#008B8B",
    "darkgoldenrod": "#B8860B",
    "darkgray": "#A9A9A9",
    "darkgreen": "#006400",
    "darkkhaki": "#BDB76B",
    "darkmagenta": "#8B008B",
    "darkolivegreen": "#556B2F",
    "darkorange": "#FF8C00",
    "darkorchid": "#9932CC",
    "darkred": "#8B0000",
    "darksalmon": "#E9967A",
    "darkseagreen": "#8FBC8F",
    "darkslateblue": "#483D8B",
    "darkslategray": "#2F4F4F",
    "darkturquoise": "#00CED1",
    "darkviolet": "#9400D3",
    "deeppink": "#FF1493",
    "deepskyblue": "#00BFFF",
    "dimgray": "#696969",
    "dodgerblue": "#1E90FF",
    "feldspar": "#D19275",
    "firebrick": "#B22222",
    "floralwhite": "#FFFAF0",
    "forestgreen": "#228B22",
    "fuchsia": "#FF00FF",
    "gainsboro": "#DCDCDC",
    "ghostwhite": "#F8F8FF",
    "gold": "#FFD700",
    "goldenrod": "#DAA520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#ADFF2F",
    "honeydew": "#F0FFF0",
    "hotpink": "#FF69B4",
    "ivory": "#FFFFF0",
    "khaki": "#F0E68C",
    "lavender": "#E6E6FA",
    "lavenderblush": "#FFF0F5",
    "lawngreen": "#7CFC00",
    "lemonchiffon": "#FFFACD",
    "lightblue": "#ADD8E6",
    "lightcoral": "#F08080",
    "lightcyan": "#E0FFFF",
    "lightgoldenrodyellow": "#FAFAD2",
    "lightgrey": "#D3D3D3",
    "lightgreen": "#90EE90",
    "lightpink": "#FFB6C1",
    "lightsalmon": "#FFA07A",
    "lightseagreen": "#20B2AA",
    "lightskyblue": "#87CEFA",
    "lightslateblue": "#8470FF",
    "lightslategray": "#778899",
    "lightsteelblue": "#B0C4DE",
    "lightyellow": "#FFFFE0",
    "lime": "#00FF00",
    "limegreen": "#32CD32",
    "linen": "#FAF0E6",
    "magenta": "#FF00FF",
    "maroon": "#800000",
    "mediumaquamarine": "#66CDAA",
    "mediumblue": "#0000CD",
    "mediumorchid": "#BA55D3",
    "mediumpurple": "#9370D8",
    "mediumseagreen": "#3CB371",
    "mediumslateblue": "#7B68EE",
    "mediumspringgreen": "#00FA9A",
    "mediumturquoise": "#48D1CC",
    "mediumvioletred": "#C71585",
    "midnightblue": "#191970",
    "mintcream": "#F5FFFA",
    "mistyrose": "#FFE4E1",
    "moccasin": "#FFE4B5",
    "navajowhite": "#FFDEAD",
    "navy": "#000080",
    "oldlace": "#FDF5E6",
    "olive": "#808000",
    "olivedrab": "#6B8E23",
    "orange": "#FFA500",
    "orangered": "#FF4500",
    "orchid": "#DA70D6",
    "palegoldenrod": "#EEE8AA",
    "palegreen": "#98FB98",
    "paleturquoise": "#AFEEEE",
    "palevioletred": "#D87093",
    "papayawhip": "#FFEFD5",
    "peachpuff": "#FFDAB9",
    "peru": "#CD853F",
    "pink": "#FFC0CB",
    "plum": "#DDA0DD",
    "powderblue": "#B0E0E6",
    "purple": "#800080",
    "red": "#FF0000",
    "rosybrown": "#BC8F8F",
    "royalblue": "#4169E1",
    "saddlebrown": "#8B4513",
    "salmon": "#FA8072",
    "sandybrown": "#F4A460",
    "seagreen": "#2E8B57",
    "seashell": "#FFF5EE",
    "sienna": "#A0522D",
    "silver": "#C0C0C0",
    "skyblue": "#87CEEB",
    "slateblue": "#6A5ACD",
    "slategray": "#708090",
    "snow": "#FFFAFA",
    "springgreen": "#00FF7F",
    "steelblue": "#4682B4",
    "tan": "#D2B48C",
    "teal": "#008080",
    "thistle": "#D8BFD8",
    "tomato": "#FF6347",
    "turquoise": "#40E0D0",
    "violet": "#EE82EE",
    "violetred": "#D02090",
    "wheat": "#F5DEB3",
    "white": "#FFFFFF",
    "whitesmoke": "#F5F5F5",
    "yellow": "#FFFF00",
    "yellowgreen": "#9ACD32"
}


def hsl_to_rgb(h: int, s: int, l: int) -> Tuple[int, int, int]:
    if s > 0:
        v_1_3 = 1.0 / 3
        v_1_6 = 1.0 / 6
        v_2_3 = 2.0 / 3

        q = l * (1 + s) if l < 0.5 else l + s - (l * s)
        p = l * 2 - q
        hk = h / 360.0
        tr = hk + v_1_3
        tg = hk
        tb = hk - v_1_3

        rgb = [
            tc + 1.0 if tc < 0 else
            tc - 1.0 if tc > 1 else
            tc
            for tc in (tr, tg, tb)
        ]

        rgb = [
            p + ((q - p) * 6 * tc) if tc < v_1_6 else
            q if v_1_6 <= tc < 0.5 else
            p + ((q - p) * 6 * (v_2_3 - tc)) if 0.5 <= tc < v_2_3 else
            p
            for tc in rgb
        ]

        rgb = tuple(int(i * 256) for i in rgb)

    else:
        rgb = l, l, l

    return rgb


def read_rgb(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(rgb_re, color)
    if m:
        r = int(m.group(1))
        g = int(m.group(2))
        b = int(m.group(3))
        return True, r, g, b, 255
    return False, 0, 0, 0, 0


def read_rgba(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(rgba_re, color)
    if m:
        r = int(m.group(1))
        g = int(m.group(2))
        b = int(m.group(3))
        a = int(float(m.group(4)) * 255)
        return True, r, g, b, a
    return False, 0, 0, 0, 0


def read_hsl(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(hsl_re, color)
    if m:
        s = m.group(2)
        l = m.group(2)
        is_s_percent = s[len(s) - 1] == '%'
        if is_s_percent:
            s = s.strip('%')
        is_l_percent = l[len(l) - 1] == '%'
        if is_l_percent:
            l = l.strip('%')
        h = int(m.group(1))
        s = float(s)
        l = float(l)
        if is_s_percent:
            s /= 100
        if is_l_percent:
            l /= 100
        r, g, b = hsl_to_rgb(h, s, l)
        return True, r, g, b, 255
    return False, 0, 0, 0, 0


def read_hsla(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(hsla_re, color)
    if m:
        s = m.group(2)
        l = m.group(2)
        is_s_percent = s[len(s) - 1] == '%'
        if is_s_percent:
            s = s.strip('%')
        is_l_percent = l[len(l) - 1] == '%'
        if is_l_percent:
            l = l.strip('%')
        h = int(m.group(1))
        s = float(s)
        l = float(l)
        if is_s_percent:
            s /= 100
        if is_l_percent:
            l /= 100
        a = int(float(m.group(4)) * 255)
        r, g, b = hsl_to_rgb(h, s, l)
        return True, r, g, b, a
    return False, 0, 0, 0, 0


def read_hex(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(hex_re, color)
    if m:
        value = m.group(1)
        r = int(value[0] + value[1], 16)
        g = int(value[2] + value[3], 16)
        b = int(value[4] + value[5], 16)

        return True, r, g, b, 255
    return False, 0, 0, 0, 0


def read_hexa(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(hexa_re, color)
    if m:
        value = m.group(1)
        r = int(value[0] + value[1], 16)
        g = int(value[2] + value[3], 16)
        b = int(value[4] + value[5], 16)
        a = int(value[6] + value[7], 16)

        return True, r, g, b, a
    return False, 0, 0, 0, 0


def read_shex(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(shex_re, color)
    if m:
        value = m.group(1)
        r = int(value[0], 16) * 16
        g = int(value[1], 16) * 16
        b = int(value[2], 16) * 16

        return True, r, g, b, 255
    return False, 0, 0, 0, 0


def read_shexa(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(shexa_re, color)
    if m:
        value = m.group(1)
        r = int(value[0], 16) * 16
        g = int(value[1], 16) * 16
        b = int(value[2], 16) * 16
        a = int(value[3], 16) * 16

        return True, r, g, b, a
    return False, 0, 0, 0, 0


def read_color_name(color: str) -> Tuple[bool, int, int, int, int]:
    m = re.match(color_name_re, color)
    if m:
        value = m.group(1).lower()
        if colors.keys().__contains__(value):
            return read_hex(colors[value])
    return False, 0, 0, 0, 0


def read_color(color: str) -> Tuple[int, int, int, int]:
    success, r, g, b, a = read_rgb(color)
    if not success:
        success, r, g, b, a = read_rgba(color)
    if not success:
        success, r, g, b, a = read_hsl(color)
    if not success:
        success, r, g, b, a = read_hsla(color)
    if not success:
        success, r, g, b, a = read_hex(color)
    if not success:
        success, r, g, b, a = read_hexa(color)
    if not success:
        success, r, g, b, a = read_shex(color)
    if not success:
        success, r, g, b, a = read_shexa(color)
    if not success:
        success, r, g, b, a = read_color_name(color)

    return r, g, b, a
