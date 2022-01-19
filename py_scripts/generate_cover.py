import hashlib
import numpy as np
import matplotlib.pyplot as plt
import math
import random
import sys
import os
from color_conversion import read_color

from typing import Tuple


def distance_from_mandelbrot(c: complex, steps: int, radius: int) -> float:
    z = 0
    dz = 0
    is_in = True
    d = 0
    for s in range(steps):
        dz = 2 * z * dz + 1
        z = z ** 2 + c
        if abs(z) > radius:
            is_in = False
            break
    if not is_in:
        d = abs(z) * math.log2(abs(z)) / abs(dz)
    return d


def mandelbrot(w: int, h: int, x_start: float, x_end: float, y_start: float, y_end: float, steps: int, radius: int) -> np.ndarray:
    points = np.zeros((w, h), dtype=np.bool_)
    pixel_size = abs(x_end - x_start) / w
    for i in range(w):
        for j in range(h):
            c = x_start + (i / w) * (x_end - x_start) + 1j * (y_start + (j / h) * (y_end - y_start))
            d = distance_from_mandelbrot(c, steps, radius)
            d = d / pixel_size
            if d > 0.5:
                points[i][j] = 1
    return points


def find_edge_point(arr: np.ndarray, x_start: float, x_end: float, y_start: float, y_end: float) -> Tuple[float, float]:
    w = arr.shape[0]
    h = arr.shape[1]
    for time in range(65536):
        x = random.randint(1, w - 2)
        y = random.randint(1, h - 2)
        has0 = False
        has_n0 = False
        for i in range(-1, 2):
            for j in range(-1, 2):
                c = arr[x + i][y + j]
                if c == 0:
                    has0 = True
                else:
                    has_n0 = True
        if has0 and has_n0:
            return x_start + (x / w) * (x_end - x_start), y_start + (y / h) * (y_end - y_start)
    return 0, 0


post_name = sys.argv[1]
fg_color = sys.argv[2]
bg_color = sys.argv[3]
public_path = sys.argv[4]

public_path = public_path.replace('\"', '/').replace('\\', '/')

if os.path.isfile(public_path + 'assets/generated_cover/POST_NAME_OF' + post_name + '.png'):
    # f = open(public_path + 'assets/generated_cover/POST_NAME_OF' + post_name + '.png', 'rb')
    # data = f.read()
    # with os.fdopen(sys.stdout.fileno(), 'wb', closefd=False) as stdout:
    #     stdout.write(data)
    print('?')
    exit(0)

post_name_hash = hashlib.md5(post_name.encode('utf-8')).hexdigest()
random.seed(int(post_name_hash, 16))

iterations = random.randint(4, 8)

x_center = 0
y_center = 0
r = 2

arr1 = None

for i in range(iterations):
    if x_center == 0 and y_center == 0 and r != 2:
        break
    arr1 = mandelbrot(100, 100, x_center - r, x_center + r, y_center - r, y_center + r, 128, 1024)
    x_center, y_center = find_edge_point(arr1, x_center - r, x_center + r, y_center - r, y_center + r)
    r /= 10

arr1 = mandelbrot(960, 540, x_center - r * 1.6, x_center + r * 1.6, y_center - r * 0.9, y_center + r * 0.9, 128, 1024).transpose()

img = np.zeros((540, 960, 4), dtype=np.float32)

fg_color = read_color(fg_color)
bg_color = read_color(bg_color)

for i in range(540):
    for j in range(960):
        if arr1[i][j]:
            for k in range(4):
                img[i][j][k] = fg_color[k] / 255
        else:
            for k in range(4):
                img[i][j][k] = bg_color[k] / 255

with os.fdopen(sys.stdout.fileno(), 'wb', closefd=False) as stdout:
    plt.imsave(stdout, img)
