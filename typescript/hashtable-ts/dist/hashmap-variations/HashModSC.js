"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Toy example hash table using a simple modulo hash function.
 *
 * Notes:
 * - Does not handle collisions
 * - Sets a fixed size without modifying the size of the underlying array.
 */
class HashMod {
    constructor() {
        /**
         * Use an arbitrary prime number as a bound for the map.
         *
         * Note: This limits the map to 7919 key/value pairs, which
         * works for this toy example, but is not ideal for a workable
         * datastructure.
         */
        this.maxSize = 7919;
        /**
         * Basic hash function for data structure:
         *
         * 1. Convert key to a string if it is not one already.
         * 2. Let hash = sum of ascii values of stringified key.
         * 3. Perform hash % maxSize for hashed index.
         *
         * @param key
         * @returns hashed index of key
         */
        this._hash = (key) => {
            const keyString = typeof key === 'string' ? key : key.toString();
            let hash = 0;
            for (let i = 0; i < keyString.length; i++) {
                hash += keyString.charCodeAt(i);
            }
            return hash % this.maxSize;
        };
        /**
         * Set a key value pair in the hash map. If the key doesn't exist,
         * add the key, value pair to the map in a list at the hashed index.
         *
         * If the key already exists, overwrite the data at that location.
         *
         * If the key resolves to the same hashed index as another distinct key (i.e a collision), append the key,value pair to the list.
         *
         * @param key
         * @param value
         */
        this.put = (key, value) => {
            const keyHash = this._hash(key);
            if (typeof this.map[keyHash] === 'undefined' || this.map[keyHash].length === 0) {
                this.map[keyHash] = [[key, value]];
            }
            else {
                let flag = false;
                for (let i = 0; i < this.map[keyHash].length; i++) {
                    if (this.map[keyHash][i][0].toString() === key.toString()) {
                        this.map[keyHash][i] = [key, value];
                        flag = true;
                    }
                }
                if (!flag) {
                    this.map[keyHash].push([key, value]);
                }
            }
        };
        /**
         * Use the passed key to retrieve a value stored in the map.
         *
         * If the key does not exist in the map, return undefined.
         *
         * @param key
         * @returns value stored at key
         */
        this.get = (key) => {
            const keyHash = this._hash(key);
            if (this.map[keyHash]) {
                const result = this.map[keyHash].find(([k, v]) => k.toString() === key.toString());
                return typeof result !== 'undefined' ? result[1] : undefined;
            }
            throw new Error('key not found');
        };
        /**
         * Delete a key/value pair from the hash table using the passed key.
         *
         * If the key does not exist, throw an error.
         *
         * @param key
         */
        this.delete = (key) => {
            const keyHash = this._hash(key);
            if (this.map[keyHash] && this.map[keyHash].filter(([k, _]) => k.toString() === key.toString()).length > 0) {
                const index = this.map[keyHash].findIndex(([k, _]) => k.toString() === key.toString());
                if (index >= 0) {
                    if (index === 0) {
                        this.map[keyHash].shift();
                    }
                    if (index > 0) {
                        this.map[keyHash] = this.map[keyHash].splice(index, 1);
                    }
                    if (this.map[keyHash].length === 0) {
                        this.map.splice(keyHash, 1);
                    }
                }
                else {
                    throw new Error('key not found');
                }
            }
            else {
                throw new Error('key not found');
            }
        };
        this.toString = () => this.map.toString();
        this.map = new Array();
    }
}
exports.default = HashMod;
//# sourceMappingURL=HashModSC.js.map