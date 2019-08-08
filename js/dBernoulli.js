import { numTest, dimTest } from 'tests'
import { pow, transpose, concat } from 'mathjs'


export default function dlogBer(p, a) {
    if (numTest(p) && numTest(a)) {
        console.assert(p > 0 && p < 1, "p out of bounds!");
        console.assert(a == 0 || a == 1, "Wrong action!");
        return (a - p) / (p - pow(p, 2));
    }
    else {
        console.assert(dimTest(p, a), "Wrong dimensions!");
        var pa = transpose(concat(p, a, 0));
        let res = pa.map(items => dlogBer(items[0], items[1]));
        return res;
    }
};