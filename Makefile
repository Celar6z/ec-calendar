DEFAULT:
	make test

test:
	./node_modules/.bin/mocha -w --compilers js:babel/register

.PHONY: \
	DEFAULT \
	test \