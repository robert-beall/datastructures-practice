"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Hash table using a simple modulo hash function.
 *
 * Features dynamic sizing for the hash table.
 *
 * Source: https://www.algolist.net/Data_structures/Hash_table/Dynamic_resizing
 *
 * Notes:
 * - Does not handle collisions
 */
class HashModDS {
    constructor() {
        /** Starting size of underlying array. */
        this.startingSize = 10;
        /** Max number of entries before resizing. */
        this.maxSize = 7;
        /** Load factor threshold */
        this.threshold = .75;
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
            return hash % this.map.length;
        };
        this._resizeArray = () => {
            console.log('resize array');
            const keyList = this.map.map(([k, _]) => k).filter(k => typeof k !== undefined);
            const keyHashes = keyList.map(k => this._hash(k));
            const newArr = this.map.slice();
            this.map = new Array(this.map.length * 2);
            keyHashes.forEach(kh => {
                const [k, v] = newArr[kh];
                this.map[this._hash(k)] = [k, v];
            });
            this.maxSize = Math.round(this.map.length * this.threshold);
        };
        /**
         * Set a key value pair in the hash map. If the key doesn't exist,
         * add the key, value pair to the map at the hashed index.
         *
         * If the key already exists, overwrite the data at that location.
         *
         * If the key resolves to the same hashed index as another distinct key (i.e a collision),
         * throw an error.
         *
         * @param key
         * @param value
         */
        this.put = (key, value) => {
            if (this.size == this.map.length - 1) {
                this._resizeArray();
            }
            const keyHash = this._hash(key);
            if (this.map[keyHash] && this.map[keyHash][0] !== key) {
                throw new Error('hashed key already exists in table');
            }
            this.map[keyHash] = [key, value];
            this.size++;
            if (this.size >= this.maxSize) {
                this._resizeArray();
            }
        };
        /**
         * Use the passed key to retrieve a value stored in the map.
         *
         * If the key does not exist in the map, throw an error.
         *
         * @param key
         * @returns value stored at key
         */
        this.get = (key) => {
            const keyHash = this._hash(key);
            if (this.map[keyHash]) {
                const [, value] = this.map[keyHash];
                return value;
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
            if (this.map[keyHash]) {
                this.map[keyHash] = undefined;
                this.size--;
            }
            else {
                throw new Error('key not found');
            }
        };
        this.toString = () => this.map.toString();
        this.map = new Array(this.startingSize);
        this.size = 0;
    }
}
exports.default = HashModDS;
//# sourceMappingURL=HashModDS.js.map