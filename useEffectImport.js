export default function transformer(file, api) {
	const j = api.jscodeshift;
	const lifeCycleMethods = ["componentDidMount","shouldComponentUpdate","componentDidUpdate","componentDidCatch"]
    var flag = 0
    j(file.source)
  	.find(j.MethodDefinition)
  	.forEach(path => {
    	if( lifeCycleMethods.indexOf(path.value.key.name) > -1){
        	flag = 1
        }
    })
  	if(flag){
    	return j('import { useEffect } from "React";\n'+file.source)
      			.toSource()
             
    }
}
