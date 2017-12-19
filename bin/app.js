#!/usr/bin/env node

const parser = require('../lib/parser');

let LibName = false;
let LibVersion = '0.0.1';

process.argv.forEach((val, index) => {
    if (val === '-n') {
        LibName = process.argv[index + 1];
    } else if (val === '-v'){
        LibVersion = process.argv[index + 1];
    }
})

if (!LibName) {
    console.log(
    `!!!Ошибка
Необходимо указать название библиотеки
 -n - название библиотеки
 -v - версия, 0.0.1 по умолчанию`
    );
    return;
}
parser.parse(LibName, LibVersion);
