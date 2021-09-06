export default function transformer(file, api) {

    const j = api.jscodeshift;


  return j(file.source)
  .find(j.ImportSpecifier,{
    imported:{type:"Identifier",name:"Component"}
  }) 
  .remove()
  .toSource()
}