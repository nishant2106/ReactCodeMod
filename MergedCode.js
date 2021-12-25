// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "babel";
var importStrings = "";
var functionDecl = "";
var renderFunc = "";
var constructorFunc = "";
var MethodDefinitions = "";
var classProperties = "";
var componentWillUnmountFunc = ""
var componentDidMountFunc = ""
var exportDefaultDecl = ""
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

function removeComponentMod(file,api){
	const j = api.jscodeshift;
  
  	const tmp = j(file.source)
    .find(j.ImportSpecifier,{
      imported:{type:"Identifier",name:"Component"}
    }) 
    return j(file.source)
    .find(j.ImportSpecifier,{
      imported:{type:"Identifier",name:"Component"}
    }) 
    .remove()
    .toSource()
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
      	const useEffectImport = j(file.source)
      	.find(j.ImportSpecifier,{
          imported:{type:"Identifier",name:"useEffect"}
        }) 
        if(useEffectImport.__paths.length == 0){
    		importStrings += 'import { useEffect } from "React";\n'
        }
    }
}
function importUseStateMod(file,api){
	const j = api.jscodeshift;
	const stateVar = j(file.source)
    					.find(j.Identifier,{name:"state"})
    if(stateVar.length > 0){
      const useStateImport = j(file.source)
      	.find(j.ImportSpecifier,{
          imported:{type:"Identifier",name:"useState"}
        })
      if(useStateImport.__paths.length == 0){
      	importStrings += 'import { useState } from "react";\n' 
      }
    }
}

function removeImport(file,api){
  const j = api.jscodeshift;
  return j(file.source).find(j.ImportDeclaration).remove().toSource()
}
function classDecl(file,api){
  	const j = api.jscodeshift;

 	const root = j(file.source);
	const p = root.find(j.ClassDeclaration)
    if(p.__paths.length){
    	functionDecl += `function ${p.__paths[0].value.id.name} (props) {`
    }
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
function componentDidMountMod(file,api){
  const j = api.jscodeshift;
  const fs = file.source
  const root = j(file.source);
  const temp = root.find(j.MethodDefinition,{
                        key:{
                         	type:"Identifier",
                          	name:"componentDidMount"
                         }}).find(j.BlockStatement)
  if(temp.__paths.length){
    const start = temp.__paths[0].value.start
    const end = temp.__paths[0].value.end

    componentDidMountFunc += "useEffect (() => "+fs.slice(start,end)+",[/*Enter Suitable Variables*/"+"])\n"
  }
}

function renderMod(file,api){
    var fs = file.source
    const j = api.jscodeshift;
    
    const render_ =j(fs).find(j.MethodDefinition,{
        key:{
          type : "Identifier",
          name : "render"
        }
    }).find(j.BlockStatement)
    if(render_.__paths.length){
    	const start = render_.__paths[0].value.start
    	const end = render_.__paths[0].value.end
    	renderFunc += fs.slice(start+1, end)
    }
}

function methodsMod(file,api){
  const j = api.jscodeshift;
  const root = j(file.source);
  const lifeCycleMethods = ["componentDidMount","shouldComponentUpdate","componentDidUpdate","componentDidCatch","componentWillMount","render","constructor"]
  const methods = root.find(j.ClassDeclaration).find(j.MethodDefinition);
  const methods_path = methods.__paths
  for(let i=0;i < methods_path.length;i++){
    if(lifeCycleMethods.indexOf(methods_path[i].value.key.name) == -1){
  		let start = methods_path[i].value.start
    	let end = methods_path[i].value.end
        MethodDefinitions += "const "; 
        let method = file.source.slice(start,end);
        let j = 0;
      	while(method[j] != '('){
          MethodDefinitions += method[j];
          j++;
        }
      	MethodDefinitions += " = ";
      	while(method[j] != ')'){
          MethodDefinitions += method[j];
          j++;
        }
      	MethodDefinitions += ") => ";
      	j++;
      	MethodDefinitions += file.source.slice(start + j, end) + "\n";     	
    }
  }
}
function classPropertyMod(file,api){
  const j = api.jscodeshift;
  const root = j(file.source);
  const methods = root.find(j.ClassDeclaration).find(j.ClassProperty);
  const methods_path = methods.__paths
  for(let i=0;i < methods_path.length;i++){
  		let start = methods_path[i].value.start
    	let end = methods_path[i].value.end
        classProperties += "const "+ file.source.slice(start,end) + "\n"
  }
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
  if(temp1.__paths.length){
  
  	let start = temp1.__paths[0].value.start
  	let end = temp1.__paths[0].value.end
  
  	constructorFunc += fs.slice(start+1,end - 1)
  }
}
function constructorMod(file,api){
	const j = api.jscodeshift;
  	const remove_constructor_1 = remove_constructor1(file,api);
  	remove_constructor2(remove_constructor_1,api)
}

function removeClassDecl(file,api){
	const j = api.jscodeshift;
  	return j(file.source).find(j.ClassDeclaration).remove().toSource()
}
function exportDefaultMod(file,api){
 	const j = api.jscodeshift;
  	const root = j(file.source);
  	const temp = root.find(j.ExportDefaultDeclaration)
    if(temp.__paths.length){
   	 	let start = temp.__paths[0].value.start
    	let end = temp.__paths[0].value.end
  		exportDefaultDecl += file.source.slice(start,end)
    }
}
function removeExportDefaultDecl(file,api){
	const j = api.jscodeshift;
  	const root = j(file.source);
  	return root.find(j.ExportDefaultDeclaration).remove().toSource()
}

export default function transformer(file, api) { 
  
	const j = api.jscodeshift;
  	let fs = file.source
    
    file.source = file.source.replaceAll("this.","")
  	file.source = removeComponentMod(file,api)
  	
  	importDecl(file,api)
  	importUseEffectMod(file,api)
  	importUseStateMod(file,api)
  	file.source = removeImport(file,api)
  	
  	classDecl(file,api)
  	constructorMod(file,api)
  	componentDidMountMod(file,api)
  	componentWillUnmountMod(file,api)
  	renderMod(file,api)
  	methodsMod(file,api)
  	classPropertyMod(file,api)
  
  	file.source = removeClassDecl(file,api)
  	
  	exportDefaultMod(file,api)
  	file.source = removeExportDefaultDecl(file,api)
  	console.log(file.source)
  
  	return importStrings+file.source+"\n"+functionDecl+constructorFunc+componentDidMountFunc+componentWillUnmountFunc+classProperties+MethodDefinitions+renderFunc+exportDefaultDecl

}
