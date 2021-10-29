// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
//https://astexplorer.net/#/gist/a85531201d197fb2ce2014b4f307e309/b9d6c5942438d26b1a50310e0bd939c012e9c8c4
export const parser = "babel";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  
  
  const temp = root.find(j.AssignmentExpression,{
    right:{
      type : "CallExpression",
      callee : {
      	type : "MemberExpression",
        property : {
        	type : "Identifier",
          	name : "bind"
        }
      }
    }
  })
  .remove()
  
  root.find(j.CallExpression,{
  	callee: {type:"Super"}
  }).remove()
  
  
  return root.toSource()
}
