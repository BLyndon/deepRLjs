/**
 * backward through sigmoid nonlinearity:
 * @param   {matrix}    dA
 * @param   {matrix}    cache
 * @return  {matrix}
 */
function bwSigmoid(dA, cache) {
    let Z = cache;
    let sigprime = math.dotMultiply(sigmoid(Z), math.subtract(1, sigmoid(Z)));
    let dZ = math.dotMultiply(dA, sigprime);

    console.assert(dimTest(dZ, Z), "Error bwSigmoid: shape dZ: " + math.size(dZ) + ", shape Z: " + math.size(Z) + ".");
    return dZ;
};