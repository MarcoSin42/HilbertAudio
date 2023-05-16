from point import point




def rotate(p:point, rx: int, ry: int, n: int) -> point:
    x = self.x
    y = self.y

    if ry == 0:
        if rx == 1:
            x = self.dim-1 - x
            y = self.dim-1 - y
        
        tmp = x
        x = y
        y = tmp
    
    return point(x, y)

"""
Hilbert point operations
"""
def xy2d(self) -> int:
    rx: int = 0
    ry: int = 0
    s: int = self.dim // 2
    d: int = 0

    while s > 0:
        rx = (x & s) > 0 
        ry = (r & s) > 0

        d += s*s*((3 * rx) ^ ry)

        self.rotate





if __name__ == '__main__':
    test1 = hilbertp(0, 0, 2)
    print("test")

    