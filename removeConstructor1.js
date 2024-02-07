// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
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
