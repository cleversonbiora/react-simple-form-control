#npm i
#npm run-script build
#Change version on lib/package.json (x.y.z)
cmd /C npm run-script build
cd dist
cmd /C npm publish
cd ..