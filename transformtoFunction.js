// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "babel";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;

  const root = j(file.source);
  const { statement } = j.template;
  //console.log(j.template);

  root
    .find(j.ClassDeclaration)
    .find(j.MemberExpression, {
      object: {
        type: "MemberExpression",
        object: { type: "ThisExpression" },
        property: { name: "props" }
      }
    })
    .forEach((p) => {
      //   console.log(p.value.property.name);
      j(p).replaceWith(`props.${p.value.property.name}`);
    });

  root.find(j.ClassDeclaration).replaceWith((p) => {
    console.log(p);

    return statement`function ${p.value.id.name} (props) {
                ${p.value.body.body}
			  
		  }`;
  });

  return root.toSource();
}
