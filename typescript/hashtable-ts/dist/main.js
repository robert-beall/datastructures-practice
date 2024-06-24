"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HashModSC_1 = __importDefault(require("./hashmap-variations/HashModSC"));
console.log('BEGIN');
const basicModuloHashTable = new HashModSC_1.default();
basicModuloHashTable.put('hello', 'world');
console.log(basicModuloHashTable.map);
basicModuloHashTable.put('elloh', 'orldw');
console.log(basicModuloHashTable.map);
basicModuloHashTable.put('night', 'man');
console.log(basicModuloHashTable.map);
basicModuloHashTable.put('elloh', 'oops');
console.log(basicModuloHashTable.map);
console.log(basicModuloHashTable.get('elloh'));
console.log(basicModuloHashTable.get('night'));
console.log(basicModuloHashTable.get('hello'));
basicModuloHashTable.delete('hello');
console.log(basicModuloHashTable.map);
basicModuloHashTable.delete('elloh');
console.log(basicModuloHashTable.map);
console.log('END');
//# sourceMappingURL=main.js.map