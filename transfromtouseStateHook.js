export const parser = "babel";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const { statement } = j.template;
  let string = " ";
  let stateVariables = {};

  j(file.source)
    .find(j.ClassProperty, { value: { type: "ObjectExpression" } })
    .forEach((p) => {
      console.log(p);
      const properties = p.value.value.properties;
      //var n=properties.length;
      // console.log(properties);
      for (let i = 0; i < properties.length; i++) {
        //console.log(properties[i].key.name + " " + properties[i].value.value);
        stateVariables[properties[i].key.name] = properties[i].value.value;

        string += `const [${properties[i].key.name},${properties[i].key.name}Setter]=useState('${properties[i].value.value}');`;
      }
      //console.log(string);

      //console.log(stateVariables);
    });

  root.find(j.ClassProperty, { value: { type: "ObjectExpression" } }).replaceWith(string);
  return root.toSource();
}
