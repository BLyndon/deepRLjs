/**
 * Heaviside step func. - applied element-wise:  
 *      x -> 0 if x < 0 
 *      x -> 1 else  
 * @param   {number|matrix}
 * @return  {number|matrix}
 */
function heaviside(x) {
    if (isNum(x)) {
        return +(x >= 0);
    }
    else {
        return x.map(item => heaviside(item));
    }
};