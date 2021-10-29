# ReactCodeMod

## Install JSCodeShift Globally:
# npm install
# npm i -g jscodeshift

## Command to run:
jscodeshift -t transform-file.js input-file.js 

## Replace state variables of class with useState hook
command:
jscodeshift -t transformToUseStateHook.js addUseStateHook.js 
Link:https://astexplorer.net/#/gist/4a21a53f099836b7287b2273bfb448ce/dba70a913d44a332545fc4d3641c0f9372faad8c

##  Chnage class Declaration to Function Declaration 
command:
jscodeshift -t changeToFunction.js transformToFunction.js 
Link:https://astexplorer.net/#/gist/7cfd48aed0a5d5575be78075f86f5b9e/a7bd58aa55f419560a9d0a745439a1d09edef302
