const HashMap = require('./Hashmap');


// #1 Hashmap Class
function main(){
    const lotr = new HashMap;
    lotr.set("Hobbit", "Bilbo");
    lotr.set("Hobbit", "Frodo");
    lotr.set("Wizard", "Gandalf");
    lotr.set("Human", "Aragorn");
    lotr.set("Elf", "Legolas");
    lotr.set("Maiar", "The Necromancer");
    lotr.set("Maiar", "Sauron");
    lotr.set("RingBearer", "Gollum");
    lotr.set("LadyOfLight", "Galadriel");
    lotr.set("HalfElven", "Arwen");
    lotr.set("Ent", "Treebeard");
    
    console.log(lotr)
    





    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;
}

//main();


// #2 What does this do?
const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}
// 20
// 10


// #3 Demonstrate understanding of hash maps
// see drawing


// #4 Remove duplicates
function duplicates(str){
    const hash = new HashMap();
    if(hash._capacity <= str.length){
        hash._capacity = str.length + 10;
    }
    let containsTF = false;
    for(let i = 0; i < str.length;){
        hash._hashTable.map(item => {
            if(item.key === str[i]){
                containsTF = true;
            }
        })

        if(containsTF === true){
            str = str.slice(0, i) + str.slice(i+1);
            i = i;
        }
        
        else{
            hash.set(str[i])
            i++;
        }
        containsTF = false;
    }

    return str;
    
}

//console.log(duplicates('google all that you think can think of'))


// #5 Any permutation a palindrome
function palindrome(str){
    const hash = new HashMap();
    if(hash._capacity <= str.length){
        hash._capacity += 10
    }
    let charCount = 0;
    let duplicates = Math.floor(str.length/2)
    for(let i = 0; i < str.length; i++){
        if(hash.length === 0){
            hash.set(str[i])
        }
        else(hash._hashTable.map(item => {
            if(item.key === str[i]){
                charCount ++;
            }
            else{
                hash.set(str[i])
            }
        }))
    }
    console.log(hash)
    if(charCount === duplicates || charCount === duplicates + 1){
        return true;
    }
    else return false;
}

//console.log(palindrome('racecraf'))


// #6
function anagrams(arr){
    let sorted = '';
    let hash = new HashMap();
    let anaArr = [];

    for(let i = 0; i < arr.length; i++){
        sorted = arr[i].split('').sort().join('')
        hash.set(arr[i], sorted);
    }
    //console.log(sorted)

    if(hash.length === 0){
        return;
    }
    else{
        hash._hashTable.map(item => {
            if(anaArr[item.value]){
                anaArr[item.value].push(item.key)
            }
            else{
                anaArr[item.value] = [item.key]
            }
        })
    }
    return anaArr;
}

let array = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
//console.log(anagrams(array))


// #7 Separate Chaining
class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
        HashMap.MAX_LOAD_RATIO = 0.5;
        HashMap.SIZE_RATIO = 3;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    set(key, value){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if(!this._hashTable[index]){
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false, 
        }; 
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            //searches for slot with matching key or empty slot
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                console.log(key, index)
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negative number. 
        return hash >>> 0;
    }
}
