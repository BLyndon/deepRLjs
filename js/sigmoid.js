/**
 * Sigmoid function - applied element-wise
 * @param   {number|matrix} x input
 * @return  {number|matrix}
 */
function sigmoid(x) {
    if (numbTest(x)) {
        return 1 / (1 + Math.exp(-x));
    }
    else {
        let res = x.map(item => this.sigmoid(item));
        return res;
    }
};