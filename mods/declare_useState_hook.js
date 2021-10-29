export const parser = "babel-eslint9";

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const { statement } = j.template;
  let string = " ";
  let stateVariables = {};
  var fs2="";

  j(file.source).find(j.ClassDeclaration).forEach(p=>{    
    let i=1;
    var fs_slice = (file.source.slice(p.value.start , p.value.end));
    const prop =j(fs_slice).find(j.ClassProperty,{
        value:{
          type : "ObjectExpression",
        }
    });
    
    let class_name = p.value.id.name;
    const start = prop.__paths[0].value.start;
    const end = prop.__paths[0].value.end;
    let class_properties= p.value.body.body;    
    class_properties.forEach(p=>{
          
    if(p.value.type=="ObjectExpression")
    {
    	const properties = p.value.properties;
        for (let i = 0; i < properties.length; i++) 
        {
          //console.log(properties[i].key.name + " " + properties[i].value.value);
          stateVariables[properties[i].key.name] = properties[i].value.value;
          string += `const [${properties[i].key.name},${properties[i].key.name}Setter]=useState(${properties[i].value.raw});\n`;

        }
    }       
  })
  fs2 += j(fs_slice).find(j.ClassProperty,{
    value:{
        type : "ObjectExpression", 
    }
   }).replaceWith( string ).toSource();
   string="";  
  })
  
  return fs2;
}