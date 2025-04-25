const dataSet1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

const dataSet2 = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788390a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};

function convertBase(input, radix) {
    return BigInt(parseInt(input, radix));
}

function interpolateConstant(coords, threshold) {
    let result = 0n;
    for (let i = 0; i < threshold; i++) {
        let { x, y } = coords[i];
        x = BigInt(x);
        y = BigInt(y);
        let top = y;
        let bottom = 1n;
        for (let j = 0; j < threshold; j++) {
            if (i !== j) {
                let xOther = BigInt(coords[j].x);
                top *= (0n - xOther);
                bottom *= (x - xOther);
            }
        }
        if (bottom < 0n) {
            bottom = -bottom;
            top = -top;
        }
        result += (top + bottom - 1n) / bottom;
    }
    return result < 0n ? -result : result;
}

function analyzeData(input) {
    const { n, k } = input.keys;
    const coords = [];
    for (let id in input) {
        if (id !== 'keys') {
            const x = parseInt(id);
            const { base, value } = input[id];
            const y = convertBase(value, parseInt(base));
            coords.push({ x, y });
        }
    }
    if (coords.length < k) {
        throw new Error('Insufficient coordinates for polynomial reconstruction');
    }
    return interpolateConstant(coords.slice(0, k), k);
}

function execute() {
    console.log(analyzeData(dataSet1).toString());
    console.log(analyzeData(dataSet2).toString());
}

execute();