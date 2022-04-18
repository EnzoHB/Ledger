class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
}

class Circle {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    };

    static intersectionPoints(...circles) {

        let f = 0;
        let s = 1;

        // Rearranging the independent terms from both circle equations;
        let fIndependent = circles[f].radius**2 - circles[f].center.x**2 - circles[f].center.y**2;
        let sIndependent = circles[s].radius**2 - circles[s].center.x**2 - circles[s].center.y**2;

        // Second degree terms cancel out, therefore we don't need to do anything;

        // Subtracting the first degree coefficients from both circle equations;
        let xFirstDegreeCoeficient = -2*circles[f].center.x - ( -2*circles[s].center.x );
        let yFirstDegreeCoeficient = -2*circles[f].center.y - ( -2*circles[s].center.y );

        // Subtracting the independent terms from both circle equations;
        let independentTerm = fIndependent - sIndependent;

        // When the y coeficcients cancel out, we must solve for x directly;
        if (!yFirstDegreeCoeficient) {

            let x = independentTerm / xFirstDegreeCoeficient;

            let a = 1;
            let b = -2 * circles[f].center.y;
            let c = ( x - circles[f].center.x )**2 + circles[f].center.y**2 - circles[f].radius**2;

            return solve2nd(a, b, c).map(y => {
                return new Vector(x, y);
            });
        };

        // When the x coefficients cancel out, we must solve for x directly;
        if (!xFirstDegreeCoeficient) {

            let y = independentTerm / yFirstDegreeCoeficient;

            let a = 1;
            let b = -2 * circles[f].center.x;
            let c = ( y - circles[f].center.y )**2 + circles[f].center.x**2 - circles[f].radius**2;

            return solve2nd(a, b, c).map(x => {
                return new Vector(x, y);
            });
        };

        // Solving the equation for Y
        let solvedForCoefficient = -xFirstDegreeCoeficient / yFirstDegreeCoeficient;
        let solvedForIndependent = independentTerm / yFirstDegreeCoeficient;

        // Expanding a trinomial expression for dealing with the y squared in the original equation;
        let [ ndDegree, stDegree, independent ] = expand(solvedForCoefficient, solvedForIndependent, 1);

        // Solving the second degree equation for X;
        let a = 1 + ndDegree;
        let b = -2 * circles[f].center.x + ( -2 * circles[f].center.y ) * ((independentTerm - xFirstDegreeCoeficient) / yFirstDegreeCoeficient ) + stDegree; 
        let c = circles[f].center.x**2 + circles[f].center.y**2 - circles[f].radius**2 + independent;

        return solve2nd(a, b, c).map(x => {
            return new Vector(x, solvedForCoefficient * x + solvedForIndependent);
        });
    };
};

function solve2nd(a, b, c) {

    let delta = b ** 2 - 4 * a * c;
    let dsqrt = Math.sqrt(delta);

    let n1 = -b + dsqrt;
    let n2 = -b - dsqrt;

    let x1 = n1 / (2 * a); 
    let x2 = n2 / (2 * a); 

    return [ x1, x2 ];
};

function expand(st, nd, sign) {
    return [st**2, 2 * sign * st * nd, nd**2];
};

const centers = [
    new Vector(1, 1),
    new Vector(1, 2)
];

const shapes = [
    new Circle(centers[0], 1),
    new Circle(centers[1], 1)
];

console.log(shapes)
console.log(Circle.intersectionPoints(...shapes));