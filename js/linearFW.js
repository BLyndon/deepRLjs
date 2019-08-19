/**
 * Linear forward propagation in a single layer
 * @param   {matrix} A input/output from previous layer
 * @param   {matrix} W weights matrix
 * @return  {Array}
 */

function linearFW(A, W, b) {
    let cache = [A, W, b];

    let WA = math.multiply(W, A);
    let Z = math.add(WA, b);

    console.assert(dimT(Z, WA), "Error linearFW!");
    return [Z, cache];
}