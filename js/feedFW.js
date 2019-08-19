/**
 * Forward propagation through the deep neural network
 * @param   {matrix} X input 
 * @param   {object} params weights and biases
 * @return  {Array}
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
}