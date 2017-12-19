const mustache = require('mustache');
const fs = require('fs');
const shell = require('shelljs');
const installedfolder = __dirname.split('/')
installedfolder.pop()
const files = [
    {
        from: '.travis.mustache',
        to: '.travis.yml'
    },
    {
        from: 'build.mustache',
        to: 'build.js'
    },
    {
        from: 'export.mustache',
        to: '{LibName}.ts'
    },
    {
        from: 'karma.conf.mustache',
        to: 'karma.conf.js'
    },
    {
        from: 'license-banner.mustache',
        to: 'license-banner.txt'
    },
    {
        from: 'LICENSE.mustache',
        to: 'LICENSE'
    },
    {
        from: 'package.mustache',
        to: 'package.json'
    },
    {
        from: 'public_api.mustache',
        to: 'public_api.ts'
    },
    {
        from: 'README.mustache',
        to: 'README.md'
    },
    {
        from: 'rollup.config.mustache',
        to: 'rollup.config.js'
    },
    {
        from: 'rollup.es.config.mustache',
        to: 'rollup.es.config.js'
    },
    {
        from: 'spec.bundle.mustache',
        to: 'spec.bundle.js'
    },
    {
        from: 'src.exports.mustache',
        to: 'src/{LibName}.ts'
    },
    {
        from: 'src.models.gitkeep.mustache',
        to: 'src/models/.gitkeep'
    },
    {
        from: 'src.modules.moduleTpl.mustache',
        to: 'src/modules/{LibName}.module.ts'
    },
    {
        from: 'src.services.gitkeep.mustache',
        to: 'src/services/.gitkeep'
    },
    {
        from: 'tests.services.gitkeep.mustache',
        to: 'tests/services/.gitkeep'
    },
    {
        from: 'tsconfig-build.mustache',
        to: 'tsconfig-build.json'
    },
    {
        from: 'tsconfig.mustache',
        to: 'tsconfig.json'
    },
    {
        from: 'tslint.mustache',
        to: 'tslint.json'
    },
]



function toPascal(name) {
    const ModuleName = []
    name.split('-').map((part) => {
        ModuleName.push(capitalize(part));
    })
    return ModuleName.join('');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function createFiles(data) {
    files.map( (file) => {
        createFile(file, data);
    })
}

function createFile(file, data) {    
    const path = createFolders(file.to, data);
    
    fs.writeFile(path, mustache.render(
        fs.readFileSync(installedfolder.join('/')+'/tpl/'+file.from, 'utf8'),
        data
    ), { flag: 'w' }, (res) => {
        console.log('File write '+path);
    });
    
}

function createFolders(to, data) {
    const folders = to.split('/');
    const file = folders.pop();
    const property = file.substring(file.indexOf('{')+1, file.indexOf('}'))        
    shell.mkdir('-p', folders.join('/'));
    return to.replace(/{(.*)}/, data[property]);
}

function parse(name, version) {    
    const data = {
        LibName: name,
        ModuleName: toPascal(name) + 'Module',
        LibVersion: version
    }

    createFiles(data);
}

module.exports.parse = parse;