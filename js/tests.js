import { size } from 'mathjs'

function numbTest(a) {
    return typeof (a) == 'number' ? true : false
};

function dimTest(matA, matB) {
    return size(matA)[0] == size(matB)[0] && size(matA)[1] == size(matB)[1] ? true : false
};

export { numbTest, dimTest };