// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "babel";
var importStrings = "";
var functionDecl = "";
var renderFunc = "";
var constructorFunc = "";
var componentWillUnmountFunc = ""
const fs = ""

function importDecl(file,api){
  const j = api.jscodeshift;
  const fs = file.source
  const importDecl = j(fs).find(j.ImportDeclaration).__paths
    importDecl.map((decl) => {
      var start = decl.value.start
      var end = decl.value.end
      importStrings += (fs.slice(start,end)) + "\n"
    })
}

function importUseEffectMod(file,api){
  	const j = api.jscodeshift;
	const lifeCycleMethods = ["componentDidMount","shouldComponentUpdate","componentDidUpdate","componentDidCatch","componentWillMount"]
    var flag = 0
    j(file.source)
  	.find(j.MethodDefinition)
  	.forEach(path => {
    	if( lifeCycleMethods.indexOf(path.value.key.name) > -1){
        	flag = 1
        }
    })
  	if(flag){
    	importStrings += 'import { useEffect } from "React";\n'
    }
}
function importUseStateMod(file,api){
	const j = api.jscodeshift;
	const stateVar = j(file.source)
    					.find(j.Identifier,{name:"state"})
    if(stateVar.length > 0){				
      importStrings += 'import { useState } from "react";\n' 
    }
}
function classDecl(file,api){
  	const j = api.jscodeshift;

 	const root = j(file.source);
	const p = root.find(j.ClassDeclaration)
    functionDecl += `function ${p.__paths[0].value.id.name} (props) {`
}

function componentWillUnmountMod(file,api){
  const j = api.jscodeshift;
  const fs = file.source
  const root = j(file.source);
  const componentWillUnmount = root.find(j.MethodDefinition,{
                        key:{
                         	type:"Identifier",
                          	name:"componentWillUnmount"
                         }}).find(j.BlockStatement)
  
  if(componentWillUnmount.__paths.length){
  
    const start = componentWillUnmount.__paths[0].value.start
    const end = componentWillUnmount.__paths[0].value.end
    componentWillUnmountFunc += "return(){\n"+fs.slice(start,end) 
  }
}

function renderMod(file,api){
    var fs = file.source
    const j = api.jscodeshift;
  	console.log(fs)
    
    const render_ =j(fs).find(j.MethodDefinition,{
        key:{
          type : "Identifier",
          name : "render"
        }
    }).find(j.BlockStatement)
    console.log(render_)
    
    const start = render_.__paths[0].value.start
    const end = render_.__paths[0].value.end
    console.log(start)
    console.log(end)
    renderFunc += fs.slice(start, end)
}
function remove_constructor1(file, api) {
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
  
  
  return root
}
function remove_constructor2(file, api) {
  const j = api.jscodeshift;
  const fs = file.toSource()
  const root = j(file.toSource());

  const temp1 =root.find(j.MethodDefinition,{
  	kind: "constructor"
  })
  .find(j.BlockStatement)
  
  let start = temp1.__paths[0].value.start
  let end = temp1.__paths[0].value.end
  
  constructorFunc += fs.slice(start+1,end - 1)
}
function constructorMod(file,api){
	const j = api.jscodeshift;
  	const remove_constructor_1 = remove_constructor1(file,api);
  	remove_constructor2(remove_constructor_1,api)
}

export default function transformer(file, api) { 
  
	const j = api.jscodeshift;
  	let fs = file.source
    //file.source = file.source.replaceAll("this.","")
   
  	importDecl(file,api)
  	importUseEffectMod(file,api)
  	importUseStateMod(file,api)
  	classDecl(file,api)
  	constructorMod(file,api)
  	componentWillUnmountMod(file,api)
  	renderMod(file,api)
  	
  return importStrings+functionDecl+constructorFunc+componentWillUnmountFunc+renderFunc+"}"

}
