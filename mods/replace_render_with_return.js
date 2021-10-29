export default function transformer(file, api){
    var fs = file.source
    const j = api.jscodeshift;
    
    const class_ = j(fs).find(
        j.ClassDeclaration
    )
    
    var fs2="";
    for(let i = 0; i < class_.__paths.length; i++){
      
      const path = class_.__paths[i];  
      var fs_slice = (fs.slice(path.value.start , path.value.end));

        console.log(fs_slice)

      const render_ =j(fs_slice).find(j.MethodDefinition,{
          key:{
            type : "Identifier",
            name : "render"
          }
      }).find(j.BlockStatement)
      const start = render_.__paths[0].value.start
      const end = render_.__paths[0].value.end
       
      fs2 += j(fs_slice).find(j.MethodDefinition,{
          key:{
            type : "Identifier",
            name : "render"
          }
      }).replaceWith( fs_slice.slice(start+1, end-1) ).toSource();
    } 
    if(fs=="")
    {
      return fs;
    }
    return fs2;
     
  };
  