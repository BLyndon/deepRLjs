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
        let res = x.map(item => this.relu(item));
        return res;
    }
};