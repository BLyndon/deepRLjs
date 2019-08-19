/**
 * Forward propagation through a single layer
 * @param   {matrix} A_prev input/output from previous layer
 * @param   {matrix} W weights matrix
 * @param   {matrix} b bias vector
 * @param   {string} activation activation function
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
}