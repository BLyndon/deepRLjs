/**
 * ReLU - applied element-wise
 * @param   {number|matrix}
 * @return  {number|matrix}
 */
function relu(x) {
    if (isNum(x)) {
        return math.max(0, x);
    }
    else {
        let res = x.map(item => relu(item));
        return res;
    }
};

/**
 * Sigmoid function - applied element-wise
 * @param   {number|matrix}
 * @return  {number|matrix}
 */
function sigmoid(x) {
    if (numbTest(x)) {
        return 1 / (1 + Math.exp(-x));
    }
    else {
        let res = x.map(item => sigmoid(item));
        return res;
    }
};

/**
 * Linear forward propagation in a single layer
 * @param   {matrix} A input/output from previous layer
 * @param   {matrix} W weigth matrix
 * @return  {Array}
 */
function linearFW(A, W, b) {
    let cache = [A, W, b];

    let WA = math.multiply(W, A);
    let Z = math.add(WA, b);

    console.assert(dimT(Z, WA), "Error linearFW!");
    return [Z, cache];
};


/**
 * Forward propagation through a single layer
 * @param   {matrix} A_prev input/output from previous layer
 * @param   {matrix} W weigth matrix
 * @param   {matrix} b bias vector
 * @param   {String} activation activation function
 * @return  {Array}
 */
function activationFW(A_prev, W, b, activation) {
    var [Z, linCache] = linearFW(A_prev, W, b);

    switch (activation) {
        case 'relu':
            var [A, actCache] = [relu(Z), Z];
            break;
        case "sigmoid":
            var [A, actCache] = [sigmoid(Z), Z];
            break;
        default:
            console.log("Wrong activation function!");
    }
    var cache = [linCache, actCache];

    return [A, cache];
};

/**
 * Forward propagation through the deep neural network
 * @param   {matrix} X network input
 * @param   {object} params weights 
 */
function feedFW(X, params) {
    let caches = [];
    let A = X;
    let AL, cache;

    for (let l = 1; l < L; l++) {
        let A_prev = A;
        [A, cache] = activationFW(A_prev, params['W' + l], params['b' + l], "relu");
        caches.push(cache);
    }
    [AL, cache] = activationFW(A, params['W' + L], params['b' + L], "sigmoid");
    caches.push(cache);

    console.assert(dimT(AL, math.ones([1, 1])), "Problem in feedForward! shape AL: (" + math.size(AL) + "), expected: (1,1).");
    return [AL, caches];
};