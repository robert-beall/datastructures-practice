/**
 * Toy example hash table using a simple modulo hash function.
 * 
 * Notes:
 * - Does not handle collisions
 * - Sets a fixed size without modifying the size of the underlying array.
 */
class HashMod<K,V> {
    map: Array<[K,V]>;

    /**
     * Use an arbitrary prime number as a bound for the map.
     * 
     * Note: This limits the map to 7919 key/value pairs, which
     * works for this toy example, but is not ideal for a workable
     * datastructure. 
     */
    maxSize = 7919; 

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
    _hash = (key: K) => {
        const keyString = typeof key === 'string' ? key : key.toString();

        let hash = 0; 

        for (let i = 0; i < keyString.length; i++) {
            hash += keyString.charCodeAt(i);
        }

        return hash % this.maxSize;
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
    set = (key: K, value: V): void => {
        const keyHash = this._hash(key);

        if (this.map[keyHash] && this.map[keyHash][0] !== key) {
            throw new Error('hashed key already exists in table');
        }

        this.map[keyHash] = [key, value];
    }

    /**
     * Use the passed key to retrieve a value stored in the map.
     * 
     * If the key does not exist in the map, throw an error.
     * 
     * @param key 
     * @returns value stored at key
     */
    get = (key: K): V => {
        const keyHash = this._hash(key);

        if (this.map[keyHash]) {
            const [,value] = this.map[keyHash];
            return value;
        }

        throw new Error('key not found');
    }

    /**
     * Delete a key/value pair from the hash table using the passed key.
     * 
     * If the key does not exist, throw an error.
     * 
     * @param key 
     */
    delete = (key: K): void => {
        const keyHash = this._hash(key);

        if (this.map[keyHash]) {
            this.map[keyHash] = undefined;
        } else {
            throw new Error('key not found');
        }
    }

    toString = () => this.map.toString();

    constructor () {
        this.map = new Array();
    }
  }
   
export default HashMod;