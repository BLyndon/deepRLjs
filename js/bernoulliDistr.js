import { dimTest, numTest } from 'tests'
import { transpose, concat, pow } from 'mathjs'

export default function bernoulliDist(p, a) {
    if (numTest(p) && numTest(a)) {
        console.assert(p > 0 && p < 1, "p out of bounds!");
        console.assert(a == 0 || a == 1, "Wrong action!");
        return pow(p, a) * pow(1 - p, 1 - a);
    }
    else {
        console.assert(dimTest(p, a), "Wrong dimensions!");
        let pa = transpose(concat(p, a, 0));
        return pa.map(items => bernoulliDist(items[0], items[1]));
    }
};
