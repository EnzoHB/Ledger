const grades = {
    P1: 9.5, 
    P2: null,
    TR: null,
    PA: 5
};

function applyGrades(grades, goal) {
    const weights = {
        P1: 1,
        P2: 2,
        TR: 1,
        PA: 1
    };

    const info = {
        max: 10,
        min: 0,
    };

    // ---------------------- //

    goal ??= 6, 
    goal *= 5;
    grades = Object.entries(grades);

    // ---------------------- //

    const known = grades.filter(([ type, grade ]) => grade !== null);
    const unknown = grades.filter(([ type, grade ]) => grade === null);

    known.forEach(([ type, grade ]) => goal -= weights[type] * grade);

    if (unknown.length > 2)
        throw new RangeError(`Can't give a 2D representation of the grade prediction`); 

    if (unknown.length == 2) {

        // Inequation
        // InequationType
        // yIntercept
        // Slope
        // values
        
        
    };

    if (unknown.length < 2) {

    };

    throw new Error('Something went really wrong');
};

applyGrades(grades)

applyGrades.pretty = grades => {

}; 