
   
export const parser = "babel";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  //console.log(j(file.source));
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
    
    
    console.log(p);
   //  console.log(class_name);
    //console.log(p.value.body.body);
    
   let class_properties= p.value.body.body;
 
    
     class_properties.forEach(p=>{
       
       
       if(p.value.type=="ObjectExpression")
        {
            //console.log(p.value);
              const properties = p.value.properties;
              for (let i = 0; i < properties.length; i++) 
              {
                //console.log(properties[i].key.name + " " + properties[i].value.value);
                stateVariables[properties[i].key.name] = properties[i].value.value;
                string += `const [${properties[i].key.name},${properties[i].key.name}Setter]=useState('${properties[i].value.value}');\n`;

              }
        
             
         


             

        }
       

            
                                  
         
  })
            
    //console.log(string);
    
     fs2 += j(fs_slice).find(j.ClassProperty,{
        value:{
          type : "ObjectExpression",
         
        }
    }).replaceWith( string ).toSource();
    
    console.log(fs2);
    string="";

    
    
  })
    
  return fs2;
}