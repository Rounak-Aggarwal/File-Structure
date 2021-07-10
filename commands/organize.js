let utilityObj = require('../utility')
let fs = require('fs')
let path = require('path')

function organizefn(dirPath) {
    //1. input -> DIRECTORY PATH GIVEN

    if(dirPath == undefined){
        destPath = process.cwd()
        return
    }else{
        let doesExist = fs.existsSync(dirPath)  //checks whether path exists or not
        if(doesExist){

            //2. create -> organised_files -> directory
            destPath = path.join(dirPath, 'organized_files') //join just creates the path and not the folder
            if(fs.existsSync(destPath) == false){                //if already folder exists then do not make it
                fs.mkdirSync(destPath)
            }

        }else{
            console.log('incorrect path!!')
            return
        }
    }
    
    organizeHelper(dirPath, destPath)
}

function organizeHelper(src, dest){
    //3. identify categories of all the files present in the input directory -> 
    let childNames = fs.readdirSync(src)  //read the contents of the directory

    if(childNames.length == 1) return     //to avoid going into loop due to recursion in empty folders

    let childAddress
    for(let i=0; i<childNames.length; i++){
        childAddress = path.join(src, childNames[i])
        let isFile  = fs.lstatSync(childAddress).isFile()   //to check if it is a file or not
        if(isFile){
            let category = getCategory(childNames[i])
            sendFiles(childAddress, dest, category)           
        }
        else{
            let childDirName = path.basename(childAddress)
            if(childDirName != 'media' && childDirName != 'documents' && childDirName != 'archives'
               && childDirName != 'app' && childDirName != 'others'){
                organizefn(childAddress)                      //Recursion
            }
        }    
    }
}

function getCategory(extension){
    let ext = path.extname(extension)
    ext = ext.slice(1)      //to remove .
    for(type in utilityObj.types){
        let cTypeArray = utilityObj.types[type]
        for(let i=0; i<cTypeArray.length; i++){
            if(ext == cTypeArray[i]) return type
        }
    }
    return 'others'
}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category) 
    if(fs.existsSync(categoryPath) == false){                
        fs.mkdirSync(categoryPath)
    }

    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(categoryPath, fileName)
    fs.copyFileSync(srcFilePath, destFilePath)             //content copy hota h file copy nhi hoti
    fs.unlinkSync(srcFilePath)                             //write this function to cut or delete the file  
                                                           //if want to cut paste then use both the above functions i.e. unlink and copy
    
}

module.exports  = organizefn