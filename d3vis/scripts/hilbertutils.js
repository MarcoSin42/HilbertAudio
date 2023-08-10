/** Reimplementation of the python algorithm */

/** 
 * Takes a 2d point and returns the point's location on the hilbert curve
 * @param   {int} n The dimension of the hilbert curve
 * @param   {int} x The x coordinate of the 2d point
 * @param   {int} y The y coordinate of the 2d point
 * @returns {int} d The point on the hilbert curve
 */
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

/**
 * Takes a point on the n-order hilbert curve and returns it's coordinates in 2d
 * @param {int} n The dimension of the hilbert curve
 * @param {int} d The point on the hilbert curve
 * @returns {[int, int]} x,y the 2d point on the hilbert curve
 */
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

/**
 * 
 * @param   {int} n The dimension of the hilbert curve
 * @param   {int} x The x coordinate of the 2d point
 * @param   {int} y The y coordinate of the 2d point
 * @param   {int} rx rotate on x 
 * @param   {int} ry rotate on y
 * @returns {[int, int]} the rotated point
 */
function rot(n, x, y, rx, ry) {
    var t;
    if (ry == 0) {
        if (rx == 1) {
            x = n - 1 - x;
            y = n - 1 - y;
        }
        return [y, x];
    }

    return [x, y];
}

/**
 * Generates a d3 path adjusted according to size of canvas
 * @param   {int} n The dimension of the hilbert curve
 * @param   {int} size The dimensions of the canvas, typically the shortest side if non-square
 * @returns {d3.path} The translated 2d points of the hilbert curve
 */
function generatePath(n, size) {
    /**
     * param order (int): The order of the hilbert curve
     * param size (int): The actual dimensions of the canvas
     */
    var path = d3.path();

    var unit = size / (2**n);
    var x,y;

    if ((n % 2) == 1) {
        path.moveTo(0, unit/2);
    } else {
        path.moveTo(unit/2, 0);
    }
    

    path.lineTo(unit/2, unit/2);

    for (let index = 0; index < 2**n*2**n; index++) {
        [x,y] = d2xy(2**n, index);
        path.lineTo(x * unit +unit/2, y * unit + unit/2);
    }

    if ((n % 2) == 1) {
        path.lineTo(size, unit/2);
    } else {
        path.lineTo(size - unit/2, 0);
    }
    
    return path;
}

