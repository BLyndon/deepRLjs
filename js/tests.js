/**
 * Check if input is a number.
 * @param   {number|matrix}
 * @return  {boolean}
 */
function isNum(a) {
    return typeof (a) == 'number' ? true : false
};


/**
 * Check if dimensions of input matrices match.
 * @param   {matrix}
 * @param   {matrix}
 * @return  {boolean}
 */
function dimTest(matA, matB) {
    return math.size(matA)[0] == math.size(matB)[0] && math.size(matA)[1] == math.size(matB)[1] ? true : false
};