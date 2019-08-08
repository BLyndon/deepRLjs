const DefaultShape = [4, 4, 1];

const numT = function (X) { return typeof (X) == 'number' ? true : false }
const dimT = function (A, B) { return math.size(A)[0] == math.size(B)[0] && math.size(A)[1] == math.size(B)[1] ? true : false }

class DeepNN {
    constructor(shape = DefaultShape) {
        Object.assign({}, shape, DefaultShape);

        this.shape = shape;
        this.L = shape.length - 1;
    }

    initParameter() {
        let params = {};

        for (let l = 1; l <= this.L; l++) {
            params['W' + l] = math.ones([this.shape[l], this.shape[l - 1]]);
            params['W' + l] = math.divide(math.map(params['W' + l], normalRandom), math.sqrt(this.shape[l - 1]));
            params['b' + l] = math.zeros([this.shape[l], 1]);
        }
        return params;
    }

    ///////// activation-funcs forward & backward /////////
    ///////// activation-funcs forward & backward /////////
    policy(p, a) {
        if (numT(p) && numT(a)) {
            console.assert(p > 0 && p < 1, "p out of bounds!");
            console.assert(a == 0 || a == 1, "Wrong action!");
            return math.pow(p, a) * math.pow(1 - p, 1 - a);
        }
        else {
            console.assert(dimT(p, a), "Wrong dimensions!");
            let pa = math.transpose(math.concat(p, a, 0));
            let res = pa.map(items => this.policy(items[0], items[1]));
            return res;
        }
    }
    dlogp(p, a) {
        if (numT(p) && numT(a)) {
            console.assert(p > 0 && p < 1, "p out of bounds!");
            console.assert(a == 0 || a == 1, "Wrong action!");
            return (a - p) / (p - math.pow(p, 2));
        }
        else {
            console.assert(dimT(p, a), "Wrong dimensions!");
            var pa = math.transpose(math.concat(p, a, 0));
            let res = pa.map(items => this.dlogp(items[0], items[1]));
            return res;
        }
    }

    sigmoid(x) {
        if (numT(x)) {
            return 1 / (1 + math.exp(-x));
        }
        else {
            let res = x.map(item => this.sigmoid(item));
            return res;
        }
    }

    relu(x) {
        if (numT(x)) {
            return math.max(0, x);
        }
        else {
            let res = x.map(item => this.relu(item));
            return res;
        }
    }

    heaviside(x) {
        if (numT(x)) {
            return +(x >= 0);
        }
        else {
            let res = x.map(item => this.heaviside(item));
            return res;
        }
    }

    bwSigmoid(dA, cache) {
        let Z = cache;
        let sigprime = math.dotMultiply(this.sigmoid(Z), math.subtract(1, this.sigmoid(Z)));
        let dZ = math.dotMultiply(dA, sigprime);

        console.assert(dimT(dZ, Z), "Error bwSigmoid: shape dZ: " + math.size(dZ) + ", shape Z: " + math.size(Z) + ".");
        return dZ;
    }

    bwRelu(dA, cache) {
        let Z = cache;
        let dZ = math.dotMultiply(dA, this.heaviside(Z));

        console.assert(dimT(dZ, Z), "Error bwRelu: shape dZ: " + math.size(dZ) + ", shape Z: " + math.size(Z) + ".");
        return dZ;
    }

    ///////// forward propagation /////////
    ///////// forward propagation /////////
    linearFW(A, W, b) {
        let cache = [A, W, b];

        let WA = math.multiply(W, A);
        let Z = math.add(WA, b);

        console.assert(dimT(Z, WA), "Error linearFW!");
        return [Z, cache];
    }

    activationFW(A_prev, W, b, activation) {
        let [Z, linCache] = this.linearFW(A_prev, W, b);

        switch (activation) {
            case 'relu':
                var [A, actCache] = [this.relu(Z), Z];
                break;
            case "sigmoid":
                var [A, actCache] = [this.sigmoid(Z), Z];
                break;
            default:
                console.log("Wrong activation function!");
        }
        let cache = [linCache, actCache];

        return [A, cache];
    }

    feedFW(X, params) {
        let caches = [];
        let A = X;
        let AL, cache;

        for (let l = 1; l < this.L; l++) {
            let A_prev = A;
            [A, cache] = this.activationFW(A_prev, params['W' + l], params['b' + l], "relu");
            caches.push(cache);
        }
        [AL, cache] = this.activationFW(A, params['W' + this.L], params['b' + this.L], "sigmoid");
        caches.push(cache);

        console.assert(dimT(AL, math.ones([1, 1])), "Problem in feedForward! shape AL: (" + math.size(AL) + "), expected: (1,1).");
        return [AL, caches];
    }

    ///////// backward propagation /////////
    ///////// backward propagation /////////
    linearBW(dZ, cache) {
        let A_prev = cache[0];
        let W = cache[1];
        let b = cache[2];

        let dW = math.multiply(dZ, math.transpose(A_prev));
        let db = dZ.map(item => item.reduce((a, b) => a + b));
        db = math.reshape(db, [math.size(dZ)[0], 1]);
        let dA = math.multiply(math.transpose(W), dZ);

        console.assert(dimT(dA, A_prev) && dimT(dW, W) && dimT(db, b), "Error linearBW!");
        return [dA, dW, db]
    }

    activationBW(dA, cache, bwActivation) {
        let [linCache, actCache] = cache;

        switch (bwActivation) {
            case 'relu':
                var dZ = this.bwRelu(dA, actCache);
                break;
            case "sigmoid":
                var dZ = this.bwSigmoid(dA, actCache);
                break;
            default:
                console.log("Wrong activation function!");
        }

        let [dA_prev, dW, db] = this.linearBW(dZ, linCache);

        return [dA_prev, dW, db];
    }

    activationBW_testpassActFunc(dA, cache, bwActivation) {
        let [linCache, actCache] = cache;
        let dZ = bwActivation(dA, actCache);
        let [dA_prev, dW, db] = this.linearBW(dZ, linCache);

        return [dA_prev, dW, db];
    }

    backprop(AL, Y, caches) {
        let grads = {};

        let dAL = [this.dlogp(AL, Y)];
        dAL = math.reshape(dAL, [1, 1])

        let currentCache = caches[this.L - 1];
        let Lm = this.L - 1;

        [grads['dA' + Lm], grads['dW' + this.L], grads['db' + this.L]] = this.activationBW(dAL, currentCache, "sigmoid");

        for (let l = this.L - 2; l >= 0; l--) {
            currentCache = caches[l];
            let lp = l + 1;
            let [dA_prev_temp, dW_temp, db_temp] = this.activationBW(grads['dA' + lp], currentCache, "relu");
            grads["dA" + l] = dA_prev_temp;
            grads["dW" + lp] = dW_temp;
            grads["db" + lp] = db_temp;
        }
        return grads;
    }
}