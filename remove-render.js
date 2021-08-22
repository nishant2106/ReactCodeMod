export default function transformer(file, api) {
  const j = api.jscodeshift;
  const renderExpression = j(file.source).find(j.ClassProperty)
  console.log(renderExpression)
  return j(file.source)
    .find(j.MethodDefinition)
    .remove()
    // .replaceWith(j)
    .toSource();
}