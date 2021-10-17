export default function transformer(file, api) {
  const fs = file.source  // file as a string

  const j = api.jscodeshift;
	const ret = j(file.source).find(j.ReturnStatement)
  if(ret){
    const path = ret.__paths[ret.__paths.length - 1]
    const start = path.value.start
    const end = path.value.end
  
    return j(file.source)
    .find(j.MethodDefinition,{
      key:{type:"Identifier",name:"render"}
    }) 
    .replaceWith(fs.slice(start,end+1))
    .toSource()
  }
}