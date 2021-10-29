
// https://astexplorer.net/#/gist/59c13a327b88befa6ffad257509e652f/1ceecd2aaf066abb11d26991a4003cb9369de120
export default function transformer(file, api) {
  const j = api.jscodeshift;
	const stateVar = j(file.source)
    					.find(j.Identifier,{name:"state"})
  if(stateVar.length > 0){				
    return j('import { useState } from "react";\n' + file.source)
      .toSource();
  }
}
