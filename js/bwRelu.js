import { dotMultiply, size, } from 'mathjs';
import heaviside from 'heaviside';

export default function bwRelu(dA, cache) {
    let Z = cache;
    let dZ = dotMultiply(dA, heaviside(Z));

    console.assert(dimTest(dZ, Z), "Error bwRelu: shape dZ: " + size(dZ) + ", shape Z: " + size(Z) + ".");
    return dZ;
}