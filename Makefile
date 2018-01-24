install: install-deps #install-flow-typed

install-deps:
		npm install

start:
	# npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

start2:
		npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.ini __tests__/__fixtures__/after.ini

start3:
		npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.yaml __tests__/__fixtures__/after.yaml

build:
		rm -rf dist
		npm run build

test:
		npm test

check-types:
		npm run flow

lint:
		npm run eslint .

publish:
		npm publish

.PHONY: test

startTest:
	npm run babel-node -- src/bin/gendiff.js
	#npm run babel-node -- /home/alex/prj/start.js
