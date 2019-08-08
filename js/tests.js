function numbTest(X) {
    return typeof (X) == 'number' ? true : false
};

function dimTest(matA, matB) {
    return math.size(matA)[0] == math.size(matB)[0] && math.size(matA)[1] == math.size(matB)[1] ? true : false
};

export { numbTest, dimTest };