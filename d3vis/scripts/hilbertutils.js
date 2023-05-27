/** Reimplementation of the python algorithm */


function xy2d(n, x, y) {
    var rx = 0;
    var ry = 0;
    var s = Math.floor(n / 2);
    var d = 0;

    while (s > 0) {
        rx = (x & s) > 0;
        ry = (y & s) > 0;

        d += s*s*((3*rx) ^ ry);
        [x,y] = rot(s, x, y, rx, ry);

        s = Math.floor(s / 2);
    }

    return d;
}

function d2xy(n, d) {
    var rx = 0;
    var ry = 0;
    var s = 1;
    var t = d;

    var x = 0;
    var y = 0;

    while (s < n) {
        rx = 1 & (Math.floor(t / 2));
        ry = 1 & (t ^ rx);

        [x,y] = rot(s, x, y, rx, ry);

        x += s * rx;
        y += s * ry;

        t = Math.floor(t / 4);
        s = s * 2;
    }

    return [x,y];
}

function rot(n, x, y, rx, ry) {
    if (ry == 0) {
        if (rx == 1) {
            x = n - 1 * x;
            y = n - 1 * y;
        }

        return [y, x];
    }

    return [x, y];
}

function generatePath(n) {
    var path = [];

    for (let index = 0; index < n*n; index++) {
        path.push(d2xy(n, index));
    }

    return path;
}
