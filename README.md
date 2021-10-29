# ReactCodeMod

## Install JSCodeShift Globally:
npm i -g jscodeshift

## Command to run:
jscodeshift -t some-transform.js input-file.js -d -p

## Replace return to render
https://astexplorer.net/#/gist/9c81844fef6d900c37dd376530c10687/f232317f0c48ca6977a75895b26d21f93dc7ea3b

## Remove "This"
https://astexplorer.net/#/gist/bf93d303e18522e7473ce3e47a22737e/db45984897c9ff5029830c6c239e180db5a54a2b

## Replace setState with setter
https://astexplorer.net/#/gist/bb6006b0c70248637461bd3d19b3f34c/48b4a423123d749be5b64443f052ebc7c94db305



## Replace state variables of class with useState hook
command:
jscodeshift -t   mods/declare_useState_hook.js       declare_useState_example.js
Link:https://astexplorer.net/#/gist/4a21a53f099836b7287b2273bfb448ce/dba70a913d44a332545fc4d3641c0f9372faad8c

##  Change class Declaration to Function Declaration and include props
command:jscodeshift -t  mods/class_to_function.js class_to_function_example.js                          
Link:https://astexplorer.net/#/gist/7cfd48aed0a5d5575be78075f86f5b9e/a7bd58aa55f419560a9d0a745439a1d09edef302
