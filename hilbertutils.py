def xy2d(n: int, x: int, y: int) -> int:
    rx: int = 0
    ry: int = 0
    s: int = n // 2
    d: int = 0

    while s > 0:
        rx = int((x & s) > 0)
        ry = int((y & s) > 0)

        d += s*s*((3 * rx) ^ ry)
        x,y = rot(n, x, y, rx, ry)
        s = s // 2


    return d

def rot(n : int, x: int, y: int, rx: int, ry: int):
    if ry == 0:
        if ry == 1:
            x = n - 1 - x
            y = n - 1 - y
        
        x,y = y,x
        
    
    return x,y


if __name__ == '__main__':
    n = 3
    for x in range(n - 1):
        for y in range(n - 1):
            print(f'x: {x} | y: {y} | d: {xy2d(n, x, y)}')

    