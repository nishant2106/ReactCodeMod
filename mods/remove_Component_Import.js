// https://astexplorer.net/#/gist/49ab214acb3560461b9f1b5e05210796/29d9036722f02c15bccb96cc60c1074c05877cfd
export default function transformer(file, api) {

    const j = api.jscodeshift;


  return j(file.source)
  .find(j.ImportSpecifier,{
    imported:{type:"Identifier",name:"Component"}
  }) 
  .remove()
  .toSource()
}