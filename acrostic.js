/* eslint-disable max-lines */
/* eslint-disable max-statements */
console.info('acrostic.js');

document.querySelector('h1').addEventListener(
    'click', (e) => e.target.textContent += '!');
const buttonDel = document.body.children[4];
const enterAddTxt = document.querySelector('textarea'); // Use too: Ctrl+Enter
const enterAddInput = document.querySelector('input'); // Use too: Ctrl+Enter
const buttonGen = document.querySelector('fieldset:nth-of-type(2) > button');
const acrostic = {
    wVertical: null,
    wReg: [],
    buttonDel: function() {
        document.querySelector('p').innerText = '';
        acrostic.wReg = [];
    },
    enterAdd: function(e) {
        if (e.key === '\n') {
            e.target.tagName === 'INPUT' ? acrostic.gen() : acrostic.addWords();
        }
    },
    addWords: function() {
        const text = document.querySelector('textarea').value.toUpperCase()
            .trim();
        document.querySelector('textarea').value = '';
        if (text === '') {
            document.querySelector('#error')
                .innerText = 'Missing data!';
            return setTimeout(() => document.querySelector('#error')
                .innerText = '', 1000);
        }
        let w = '';
        for (const c of text) {
            if ((c.charCodeAt() < 'A'.charCodeAt() ||
                    c.charCodeAt() > 'Z'.charCodeAt()) && c !== ',' &&
                        c !== ' ') {
                w = '';
                break;
            }
            if (c.charCodeAt() >= 'A'.charCodeAt() &&
                c.charCodeAt() <= 'Z'.charCodeAt()) w += c;
            else if (w &&
                w.trim()[w.trim().length - 1] !== ',') {
                w += ', ';
            }
            w = w.trim()[w.length - 1] === ',' ? w.substr(0, w.length - 1 - 1)
                : w;
        }
        if (w === '') {
            document.querySelector('#error').innerText = 'Invalid character1';
            return setTimeout(function() {
                document.querySelector('#error').innerText = '';
            }, 3000);
        }
        acrostic.wReg = acrostic.wReg.concat(w.split(', '));
        const nReg = [];
        for (let c = 0; c < acrostic.wReg.length; c++) {
            nReg[acrostic.wReg.indexOf(acrostic.wReg[c])] = acrostic.wReg[c];
        }
        acrostic.wReg = [];
        for (let c = 0; c < nReg.length; c++) {
            if (nReg[c] !== undefined) acrostic.wReg.push(nReg[c]);
        }
        document.querySelector('p').innerText = acrostic.wReg.join(', ');
    },
    gen: function() {
        const text = document.querySelector('input').value.toUpperCase().trim();
        if (document.querySelector('#acrostic').children.length) {
            document.querySelector('#acrostic').removeChild(document
                .querySelector('#acrostic tbody'));
        }
        document.querySelector('input').value = '';
        if (text === '' || document.querySelector('p').innerText === '') {
            document.querySelector('#error')
                .innerText = 'Missing data!';
            return setTimeout(() => document.querySelector('#error')
                .innerText = '', 1000);
        }
        for (const c of text) {
            if (c.charCodeAt() > 90 || c.charCodeAt() < 65) {
                document.querySelector('#error')
                    .innerText = 'Invalid character!';
                return setTimeout(function() {
                    document.querySelector('#error').innerText = '';
                }, 3000);
            }
        }
        acrostic.wVertical = text;
        const wR = acrostic.wReg;
        const wV = acrostic.wVertical;
        const yLgth = wV.length;
        let xLengthR = 0;
        let xLengthL = 0;
        let i = 0;
        const regExt = [];
        let ft = false;
        function indexArr(a, b) {
            for (let c = 0; c < a.length; c++) {
                if (String(a[c]) === String(b)) return c;
            }
            return - 1;
        }
        const f = (n) => n < 0 ? - 1 : n ? (n * f(n - 1)) : 1;
        while (i < f(wR.length) / f(wR.length - yLgth) && !ft) {
            const regInt = [];
            let j = 0;
            while (j < yLgth) {
                const randNum = Math.floor(Math.random() * wR.length);
                if (!(regInt.indexOf(randNum) + 1)) {
                    regInt.push(randNum);
                    j++;
                }
            }
            if (!(indexArr(regExt, regInt) + 1)) {
                for (let c = 0; c < yLgth; c++) {
                    if (!(wR[regInt[c]].indexOf(wV[c]) + 1)) break;
                    else if (c === yLgth - 1) ft = true;
                }
                regExt.push(regInt);
                if (ft) break;
                i++;
            }
        }
        if (!ft) {
            document.querySelector('#error')
                .innerText = 'It didn\'t work with that words :/';
            return setTimeout(() => document.querySelector('#error')
                .innerText = '', 3000);
        }
        const uR = regExt[regExt.length - 1];
        for (let c = 0; c < yLgth; c++) {
            xLengthR = wR[uR[c]] - wR[uR[c]].indexOf(wV[c]) - 1 > xLengthR ?
                wR[uR[c]] - wR[uR[c]].indexOf(wV[c]) - 1 : xLengthR;
            xLengthL = wR[uR[c]].indexOf(wV[c]) > xLengthL ?
                wR[uR[c]].indexOf(wV[c]) : xLengthL;
        }
        for (let c = 0; c < yLgth; c++) {
            document.querySelector('#acrostic').insertRow();
            const rL = (' '
                .repeat(xLengthL - wR[uR[c]].indexOf(wV[c])) + wR[uR[c]])
                .split('');
            for (let d = 0; d < rL.length; d++) {
                document.querySelector('#acrostic').rows[c].insertCell();
                document.querySelector('#acrostic').rows[c].cells[d]
                    .innerText = rL[d];
                if (d === xLengthL) {
                    document.querySelector('#acrostic').rows[c].cells[d]
                        .classList.add('wV');
                } else if (rL[d] !== ' ') {
                    document.querySelector('#acrostic').rows[c].cells[d]
                        .classList.add('words');
                }
            }
        }
    }
};
document.querySelector('button').addEventListener('click', acrostic.addWords);
buttonDel.addEventListener('click', acrostic.buttonDel);
enterAddTxt.addEventListener('keypress', acrostic.enterAdd);
enterAddInput.addEventListener('keypress', acrostic.enterAdd);
buttonGen.addEventListener('click', acrostic.gen);
