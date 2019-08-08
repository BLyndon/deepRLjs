import { numbTest } from tests.js

export default function relu(x) {
    if (numbTest(x)) {
        return math.max(0, x);
    }
    else {
        let res = x.map(item => this.relu(item));
        return res;
    }
};