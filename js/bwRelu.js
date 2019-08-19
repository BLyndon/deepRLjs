/**
 * backprop through ReLU nonlinearity:
 * @param   {matrix}    dA
 * @param   {matrix}    cache
 * @return  {matrix}
 */
function bwRelu(dA, cache) {
    let Z = cache;
    let dZ = math.dotMultiply(dA, heaviside(Z));

    console.assert(dimTest(dZ, Z), "Error bwRelu: shape dZ: " + math.size(dZ) + ", shape Z: " + math.size(Z) + ".");
    return dZ;
}