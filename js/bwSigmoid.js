import { dimTest } from 'tests'
import { dotMultiply, size, subtract } from 'mathjs'
import sigmoid from 'sigmoid'

export default function bwSigmoid(dA, cache) {
    let Z = cache;
    let sigprime = dotMultiply(sigmoid(Z), subtract(1, sigmoid(Z)));
    let dZ = dotMultiply(dA, sigprime);

    console.assert(dimTest(dZ, Z), "Error bwSigmoid: shape dZ: " + size(dZ) + ", shape Z: " + size(Z) + ".");
    return dZ;
};