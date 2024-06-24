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
class HashModDS<K,V> {
    /** Array to store key,value pairs */
    map: Array<[K,V]>;
    /** Starting size of underlying array. */
    startingSize = 10;
    /** Max number of entries before resizing. */
    maxSize = 7;
    /** Number of key,value pairs stored in array */
    size: number; 
    /** Load factor threshold */
    threshold = .75;


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

        return hash % this.map.length;
    };

    _resizeArray = () => {
        console.log('resize array');
        const keyList = this.map.map(([k, _]) => k).filter(k => typeof k !== undefined);
        const keyHashes: number[] = keyList.map(k => this._hash(k));
        const newArr = this.map.slice();
        this.map = new Array(this.map.length * 2);

        keyHashes.forEach(kh => {
            const [k, v] = newArr[kh];
            this.map[this._hash(k)] = [k,v];
        });

        this.maxSize = Math.round(this.map.length * this.threshold);
    }

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
    put = (key: K, value: V): void => {
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
            this.size--;
        } else {
            throw new Error('key not found');
        }
    }

    toString = () => this.map.toString();

    constructor () {
        this.map = new Array(this.startingSize);
        this.size = 0;
    }
  }
   
export default HashModDS;