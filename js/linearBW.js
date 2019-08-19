/**
 * Linear backprop in a single layer
 * @param   {matrix} dZ input/output from previous layer
 * @param   {array} cache array with hidden unit values
 * @return  {Array}
 */
function linearBW(dZ, cache) {
    let A_prev = cache[0];
    let W = cache[1];
    let b = cache[2];

    let dW = math.multiply(dZ, math.transpose(A_prev));
    let db = dZ.map(item => item.reduce((a, b) => a + b));
    db = math.reshape(db, [math.size(dZ)[0], 1]);
    let dA = math.multiply(math.transpose(W), dZ);

    console.assert(dimT(dA, A_prev) && dimT(dW, W) && dimT(db, b), "Error linearBW!");
    return [dA, dW, db]
}