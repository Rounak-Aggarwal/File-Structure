#!/usr/bin/env node

//then npm init -y , to create a package.json file
//then in this file write in bin object your petname and file name
//then npm link..
//The above shebang sysntax for node should be used
//at the top only
 
//Note: If we declare a variable without using any keyword
//like let/var then it will be considered as global - ***
//so to make a variable local we need to use let/var

let inputArr = process.argv.slice(2)   //process.argv gives an array of input
// console.log(inputArr)

let organizeObj = require('./commands/organize')
let helpObj = require('./commands/help')
let treeObj = require('./commands/tree')


// // let utility = {}
// // utility.types
//  let types= {
//     media: ['mp4', 'mkv'],
//     archives: ['zip', '7z', 'rar', 'tar', 'ar', 'gz', 'xz','iso'],
//     documents: ['pdf', 'docx', 'doc', 'xlsx', 'odt', 'ods', 'odp', 'txt', 'odg', 'odf', 'ps', 'tex'],
//     app: ['exe', 'pkg', 'dmg', 'deb', ]
// }

//node main.js tree 'directoryPath'
//node main.js organize 'directoryPath'
//node main.js help

let command = inputArr[0]
switch(command){
    case 'tree':
        treeObj.treeKey(inputArr[1])
        break
    case 'organize':
        organizeObj(inputArr[1])
        break
    case 'help':
        helpObj()
        break
    default: 
        console.log('Please 🙏 input right command')
}

//NOTE: If we wanna make anything global or wanna put anything into command line 
//then search for language name and shebang syntax 

//language logic deti h framework features deti h