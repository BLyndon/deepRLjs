import { numbTest } from tests.js

/**
 * Heaviside step func. - applied element-wise:  
 *      x -> 0 if x < 0 
 *      x -> 1 else  
 * @param   {matrix}
 * @return  {matrix}
 */
export default function heaviside(x) {
    if (numbTest(x)) {
        return +(x >= 0);
    }
    else {
        return x.map(item => heaviside(item));
    }
};