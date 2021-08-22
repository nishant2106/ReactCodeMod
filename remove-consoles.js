import fs from 'fs'
export default (fileInfo, api) => {
    const j = api.jscodeshift;
  
    const root = j(fileInfo.source)

    const CallExpression = root.find(j.CallExpression, {
            callee: {
                type: 'MemberExpression',
                object: { type: 'Identifier', name: 'console' },
            },
        })
    CallExpression.remove()
  
    fs.writeFile('output.js', root.toSource(), err => {
        if (err) {
          console.log(err)
        } else {
          console.log('File written')
        }
      })
  };