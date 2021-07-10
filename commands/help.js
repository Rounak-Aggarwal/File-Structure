function helpfn(){              //`` is used to create a string literal in multiple lines as we want
    console.log(`
        List of all the commands:
                    node main.js tree 'directoryPath'
                    node main.js organize 'directoryPath'
                    node main.js help
                `)
}

module.exports = helpfn