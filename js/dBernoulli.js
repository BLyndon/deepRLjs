import { isNum, dimTest } from 'tests'
import { pow, transpose, concat } from 'mathjs'

/**
 * Derivative of the log-probability for a pair
 * (p, a), as well as for vector of tuples.
 * @param   {matrix}
 * @param   {matrix}
 * @return  {matrix}
 */
export default function dlogBernoulli(p, a) {
    if (isNum(p) && isNum(a)) {
        console.assert(p > 0 && p < 1, "p out of bounds!");
        console.assert(a == 0 || a == 1, "Action-value wrong!");
        return (a - p) / (p - pow(p, 2));
    }
    else {
        console.assert(dimTest(p, a), "Vectors have different lengths!");
        var pa = transpose(concat(p, a, 0));
        let res = pa.map(items => dlogBernoulli(items[0], items[1]));
        return res;
    }
};