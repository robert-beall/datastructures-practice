import { faker } from '@faker-js/faker';
import HashModSC from "./hashmap-variations/HashModSC";

console.log('BEGIN')
const basicModuloHashTable = new HashModSC<string, string>();

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
console.log('END')