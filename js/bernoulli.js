/**
 * Bernoulli distribution 
 * @param   {number|matrix}    p   p in (0, 1)
 * @param   {number|matrix}    a   a = 0,1
 * @return  {number|matrix}
 */
function bernoulli(p, a) {
    if (isNum(p) && isNum(a)) {
        console.assert(p > 0 && p < 1, "p out of bounds!");
        console.assert(a == 0 || a == 1, "Wrong action!");
        return math.pow(p, a) * math.pow(1 - p, 1 - a);
    }
    else {
        console.assert(dimTest(p, a), "Wrong dimensions!");
        let pa = math.transpose(math.concat(p, a, 0));
        return pa.map(items => bernoulli(items[0], items[1]));
    }
};
