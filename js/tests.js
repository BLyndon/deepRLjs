import { size } from 'mathjs'

/**
 * Check type of the input.
 * @param   {matrix}
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
    return size(matA)[0] == size(matB)[0] && size(matA)[1] == size(matB)[1] ? true : false
};

export { isNum, dimTest };