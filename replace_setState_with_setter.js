export const parser = "babel";

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  
   var replacements = [];
  
  j(file.source).find(j.ClassDeclaration).forEach(p=>{    
    let i=1;
    var class_slice = (file.source.slice(p.value.start , p.value.end));
  
    let setState_declaration =j(class_slice)
    .find(j.ExpressionStatement)
    .find(j.CallExpression,{
    	callee:{
          type:"MemberExpression",
        
        }, 
    });
   
 
  let setterString = ""; 
  for(let useStateCnt = 0; useStateCnt < setState_declaration.__paths.length; useStateCnt++)
  {
  	for(let argumentsCnt =0;argumentsCnt< setState_declaration.__paths[useStateCnt].value.arguments.length;argumentsCnt++)
    {
    
    	for(let propertiesCnt = 0; propertiesCnt < setState_declaration.__paths[useStateCnt].value.arguments[argumentsCnt].properties.length; propertiesCnt++)
        {
        	setterString += setState_declaration.__paths[useStateCnt].value.arguments[argumentsCnt].properties[propertiesCnt].key.name
              				+ "Setter(" 
              					+ setState_declaration.__paths[useStateCnt].value.arguments[argumentsCnt].properties[propertiesCnt].value.raw
          							+ ");\n";
        }
    }
    replacements.push(setterString);
     	setterString = "";
  }

 }); 
 	let count=0;
	let fs2 = j(file.source).find(j.ClassDeclaration).find(j.ExpressionStatement).forEach((setState)=>{
    	console.log(setState);
      	setState.replace(replacements[count++]);
    }).toSource();
    
    console.log(fs2);
  return fs2;
}