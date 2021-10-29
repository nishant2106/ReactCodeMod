//export const parser = "babel";
/*const [object, objectSetter] = useState({
  	year: 1995,
    type: "Mercedes",
    used : true,
  });*/

export default function transformer(file, api) {
	const j = api.jscodeshift;
	const root = j(file.source);

	var state_replacements = [];
	var setState_replacements = [];

	j(file.source)
		.find(j.ClassDeclaration)
		.forEach((p) => {
			var class_slice = file.source.slice(p.value.start, p.value.end);

			//PART 1 state declarations
			const state_declaration = j(class_slice).find(j.ClassProperty, {
				key: {
					type: 'Identifier',
					name: 'state',
				},
				value: {
					type: 'ObjectExpression',
				},
			});

			//console.log(prop)
			var state_start = state_declaration.__paths[0].value.value.start;
			var state_end = state_declaration.__paths[0].value.value.end;

			//console.log(class_slice.slice(start, end));
			var state_string = 'const [object, objectSetter] = useState(';

			state_string += class_slice.slice(state_start, state_end);
			state_string += ');';
			//console.log(state_string);
			//state_declaration.replaceWith(state_string);
			state_replacements.push(state_string);

			// PART2 setState Declaration

			let setState_declaration = j(class_slice)
				.find(j.ExpressionStatement)
				.find(j.CallExpression, {
					callee: {
						type: 'MemberExpression',
					},
				});

			console.log(setState_declaration);

			for (let useStateCnt = 0; useStateCnt < setState_declaration.__paths.length; useStateCnt++) {
				let setState_string = 'setObject((prevState) => ({\n...prevState,\n';

				for (let argumentsCnt = 0; argumentsCnt < setState_declaration.__paths[useStateCnt].value.arguments.length; argumentsCnt++) {
					for (let propertiesCnt = 0; propertiesCnt < setState_declaration.__paths[useStateCnt].value.arguments[argumentsCnt].properties.length; propertiesCnt++) {
						setState_string += setState_declaration.__paths[useStateCnt].value.arguments[argumentsCnt].properties[propertiesCnt].key.name + ':' + setState_declaration.__paths[useStateCnt].value.arguments[argumentsCnt].properties[propertiesCnt].value.raw + ',\n';
					}
				}
				setState_string += '}));';

				setState_replacements.push(setState_string);
			}
		});

	let count = 0;
	//console.log(replacements);
	let fs2 = j(file.source)
		.find(j.ClassDeclaration)
		.find(j.ExpressionStatement)
		.forEach((setState) => {
			//console.log(setState);
			setState.replace(setState_replacements[count++]);
		})
		.toSource();
	count = 0;
	fs2 = j(fs2)
		.find(j.ClassDeclaration)
		.find(j.ClassProperty, {
			key: {
				type: 'Identifier',
				name: 'state',
			},
			value: {
				type: 'ObjectExpression',
			},
		})
		.forEach((state) => {
			//console.log(setState);
			state.replace(state_replacements[count++]);
		})
		.toSource();

	//console.log(fs2);
	return fs2;
}
