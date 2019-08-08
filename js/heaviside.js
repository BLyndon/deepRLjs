import { numbTest } from tests.js

export default function heaviside(x) {
    if (numbTest(x)) {
        return +(x >= 0);
    }
    else {
        return x.map(item => heaviside(item));
    }
};