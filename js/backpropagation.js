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

/**
 * Linear backprop in a single layer
 * @param   {matrix} dZ input/output from previous layer
 * @param   {Array} cache array with hidden unit values
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

/**
 * Backprop trough a single layer
 * @param   {matrix} dA 
 * @param   {Array} cache array with hidden unit values
 * @param   {String} bwActivation
 * @return  {Array}
 */
function activationBW(dA, cache, bwActivation) {
    let [linCache, actCache] = cache;

    switch (bwActivation) {
        case 'relu':
            var dZ = bwRelu(dA, actCache);
            break;
        case "sigmoid":
            var dZ = bwSigmoid(dA, actCache);
            break;
        default:
            console.log("Wrong activation function!");
    }

    let [dA_prev, dW, db] = linearBW(dZ, linCache);

    return [dA_prev, dW, db];
}
/**
 * Backward propagation through the deep neural network
 * @param   {matrix} AL network output from FW propagation
 * @param   {matrix} Y
 * @param   {Array}
 * @return  {matrix}
 */
function backprop(AL, Y, caches) {
    let grads = {};

    let dAL = [dlogp(AL, Y)];
    dAL = math.reshape(dAL, [1, 1])

    let currentCache = caches[L - 1];
    let Lm = L - 1;

    [grads['dA' + Lm], grads['dW' + L], grads['db' + L]] = activationBW(dAL, currentCache, "sigmoid");

    for (let l = L - 2; l >= 0; l--) {
        currentCache = caches[l];
        let lp = l + 1;
        let [dA_prev_temp, dW_temp, db_temp] = activationBW(grads['dA' + lp], currentCache, "relu");
        grads["dA" + l] = dA_prev_temp;
        grads["dW" + lp] = dW_temp;
        grads["db" + lp] = db_temp;
    }
    return grads;
}