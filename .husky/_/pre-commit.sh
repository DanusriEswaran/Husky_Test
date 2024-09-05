#!/usr/bin/env sh
if [ ! -d "$PWD/.husky/_/" ] 
then
    npm run prepare
fi


cd Mail
npm run preCommit
