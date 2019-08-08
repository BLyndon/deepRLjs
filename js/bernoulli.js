import { dimTest, isNum } from 'tests'
import { transpose, concat, pow } from 'mathjs'

/**
 * Bernoulli distribution 
 * @param   {matrix}    p   p in (0, 1)
 * @param   {matrix}    a   a = 0,1
 * @return  {matrix}
 */
export default function bernoulli(p, a) {
    if (isNum(p) && isNum(a)) {
        console.assert(p > 0 && p < 1, "p out of bounds!");
        console.assert(a == 0 || a == 1, "Wrong action!");
        return pow(p, a) * pow(1 - p, 1 - a);
    }
    else {
        console.assert(dimTest(p, a), "Wrong dimensions!");
        let pa = transpose(concat(p, a, 0));
        return pa.map(items => bernoulli(items[0], items[1]));
    }
};
