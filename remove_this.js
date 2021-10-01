export const parser = 'babel'

export default function transformer(file, api) {
  	const j = api.jscodeshift;
  	let code = file.source;
  	code = code.replace("this.state.", "");
  	code = code.replace("this.", "");  
  	return j(code).toSource();
}
