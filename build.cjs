const fs = require('fs');
const babel = require('@babel/core');
const {code} = babel.transformSync(['src/photos.tsx','src/pipeline.tsx','src/camera.tsx','src/app.tsx'].map(path => fs.readFileSync(path,'utf8')).join('\n'),{filename:'app.tsx',presets:[require.resolve('@babel/preset-typescript'),require.resolve('@babel/preset-react')],comments:false});
fs.writeFileSync('dist/app.js',code);
