export default function transformer(file, api) {
  const fs = file.source  // file as a string

  const j = api.jscodeshift;
	const ret = j(file.source).find(j.ReturnStatement)
  if(ret){
    const start = ret.__paths[0].value.start
    const end = ret.__paths[0].value.end
  
    return j(file.source)
    .find(j.MethodDefinition,{
      key:{type:"Identifier",name:"render"}
    }) 
    .replaceWith(fs.slice(start,end+1))
    .toSource()
  }
}
