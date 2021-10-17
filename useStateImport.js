export default function transformer(file, api) {
  const j = api.jscodeshift;
	const stateVar = j(file.source)
    					.find(j.Identifier,{name:"state"})
  if(stateVar.length > 0){				
    return j('import { useState } from "react";\n' + file.source)
      .toSource();
  }
}
