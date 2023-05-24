def xy2d(n: int, x: int, y: int) -> int:
    rx: int = 0
    ry: int = 0
    s: int = int(n / 2)
    d: int = 0

    while s > 0:
        rx = int((x & s) > 0)
        ry = int((y & s) > 0)

        d += s*s*((3 * rx) ^ ry)
        x,y = rot(n, x, y, rx, ry)
        s = s // 2

    return d

def d2xy(n: int, d: int) -> tuple([int, int]):
    rx: int = 0
    ry: int = 0
    s: int = 1
    t: int = d

    x: int = 0
    y: int = 0

    while s < n:
        rx = 1 & (t // 2)
        ry = 1 & (t ^ rx)

        x,y = rot(s, x, y, rx, ry)

        x += s * rx
        y += s * ry

        t = t // 4
        s *= 2
    
    return x,y

def rot(n : int, x: int, y: int, rx: int, ry: int) -> tuple([int, int]):
    if ry == 0:
        if ry == 1:
            x = n - 1 - x
            y = n - 1 - y
        
        x,y = y,x
        
    
    return x,y


if __name__ == '__main__':

    print("Running Tests")
    n_lst = [int(2**i) for i in range(4,10)]
    for n in n_lst:
        for x in range(n):
            for y in range(n):
                d = xy2d(n, x, y)
                #print(f'x: {x:3d} | y: {y:3d} | d: {d:3d}')

                xd,yd = d2xy(n - 1, xy2d(n, x, y))

                assert xd == x, f"xy2d or d2xy error: x should be {x:3d} but got {xd:3d} instead"
                assert yd == y, f"xy2d or d2xy error: y should be {y:3d} but got {yd:3d} instead"
    print("Tests passed")