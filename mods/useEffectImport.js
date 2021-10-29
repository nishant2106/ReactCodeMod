// https://astexplorer.net/#/gist/59c13a327b88befa6ffad257509e652f/c70fa6cc4884e5367bb2ae7d793317f06aeda76c
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
