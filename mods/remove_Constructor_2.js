// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser

// https://astexplorer.net/#/gist/a85531201d197fb2ce2014b4f307e309/7261e1885b12641d70356174aa546388282d7bf4
export const parser = "babel";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const fs = file.source
  const root = j(file.source);

  const temp1 =root.find(j.MethodDefinition,{
  	kind: "constructor"
  })
  .find(j.BlockStatement)
  
  console.log(temp1.__paths[0].value.start)
  
  let start = temp1.__paths[0].value.start
  let end = temp1.__paths[0].value.end
  
  return root.find(j.MethodDefinition,{
  	kind: "constructor"
  }).replaceWith(fs.slice(start+1,end - 1)).toSource()
  //return root.toSource();
}