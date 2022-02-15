default: build

lint:
	node ./node_modules/eslint/bin/eslint . --ext .js --fix

copy-assets:
	mkdir -p dist/assets && cp -r src/assets dist/

clean-dist:
	rm -rf dist/

build: clean-dist copy-assets
	node ./node_modules/parcel-bundler/bin/cli build ./src/index.html --out-dir ./dist/

run:
	npm run start &