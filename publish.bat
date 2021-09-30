#Change version on lib/package.json (x.y.z)
#.\publish
cmd /C npm install
cmd /C npm run-script build
cd dist
cmd /C npm publish
cd ..