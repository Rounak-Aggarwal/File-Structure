let fs = require('fs')
let path = require('path')

function treefn(dirPath){
    
    if(dirPath == undefined){
        //console.log('Kindly enter the path')
        treeHelper(process.cwd(), "")  //current working directory
        return
    }else{
        let doesExist = fs.existsSync(dirPath)  //checks whether path exists or not
        if(doesExist){
            treeHelper(dirPath, "")

        }else{
            console.log('incorrect path!!')
            return
        }
    }
}

function treeHelper(dirPath, indent){
    //is file or folder
    let isFile = fs.lstatSync(dirPath).isFile()
    if(isFile){
        let fileName = path.basename(dirPath)
        console.log(indent + "|---- ", fileName)
    }else{
        let dirName = path.basename(dirPath)
        console.log(indent + "|____ ", dirName)
        let children = fs.readdirSync(dirPath)

        for(let i=0; i<children.length; i++){
            let childPath = path.join(dirPath, children[i])
            treeHelper(childPath, indent + "\t")
        }
    }
}

module.exports = {
    treeKey:treefn
}