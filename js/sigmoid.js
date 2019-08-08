import { numbTest } from tests.js

/**
 * Sigmoid function applied element-wise
 * @param   {matrix}
 * @return  {matrix}
 */
export default function sigmoid(x) {
    if (numbTest(x)) {
        return 1 / (1 + Math.exp(-x));
    }
    else {
        let res = x.map(item => this.sigmoid(item));
        return res;
    }
};