const SHA256 = require('crypto-js/sha256');

class Block {
    //index: tell us WHERE the block is the chain
    //timestamp: tell us WHEN the block was createad
    //data: contais the block data
    //previcousHash: contais the previous block hash string
    contructor(index, timestamp, data, previoushASH=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushASH = previoushASH;
        this.hash = this.calculateBlockHash;
    }

    calculateBlockHash(){
        return SHA256(this.index + this.previoushASH + this.timestamp +JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.creategenesisBlock()];
    }

    creategenesisBlock(){
        return new Block(0, "01/01/2023", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previoushASH = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateBlockHash();
        this.chain.push(newBlock);
    }
}

let blockchain = new Blockchain();
blockchain.addBlock(new Block(1, "16/05/2001", {code: 1}));
blockchain.addBlock(new Block(2, "18/05/2001", {code: 34}));
blockchain.addBlock(new Block(3, "16/05/2001", {code: 23}));

console.log(JSON.stringify(blockchain, null, 4));