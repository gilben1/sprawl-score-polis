const path = require('path');

module.exports = {
    entry: './build/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // Replace 'dist' with your desired output directory
        filename: 'bundle.js',
    },
};