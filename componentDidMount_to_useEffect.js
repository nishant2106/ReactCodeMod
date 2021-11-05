// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "babel";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const fs = file.source
  const root = j(file.source);
  const temp = root.find(j.MethodDefinition,{
                        key:{
                         	type:"Identifier",
                          	name:"componentDidMount"
                         }}).find(j.BlockStatement)
  const start = temp.__paths[0].value.start
  const end = temp.__paths[0].value.end
  console.log()
  return root.find(j.MethodDefinition,{
                        key:{
                         	type:"Identifier",
                          	name:"componentDidMount"
                         }})
    .replaceWith("useEffect (() => "+fs.slice(start,end)+",[])")
    .toSource()
  
  

}
