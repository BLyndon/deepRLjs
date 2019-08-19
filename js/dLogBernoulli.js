/**
 * Derivative of the log-probability of the Bernoulli distribution
 * @param   {number|matrix} p   p in (0, 1)
 * @param   {number|matrix} a   a = 0,1
 * @return  {number|matrix}
 */
function dLogBernoulli(p, a) {
    if (isNum(p) && isNum(a)) {
        console.assert(p > 0 && p < 1, "p out of bounds!");
        console.assert(a == 0 || a == 1, "Action-value wrong!");
        return (a - p) / (p - math.pow(p, 2));
    }
    else {
        console.assert(dimTest(p, a), "Vectors have different lengths!");
        var pa = math.transpose(math.concat(p, a, 0));
        let res = pa.map(items => dLogBernoulli(items[0], items[1]));
        return res;
    }
};