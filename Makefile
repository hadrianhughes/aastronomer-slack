run_tests:
	python3 -m pytest ./lambdas

deploy: run_tests
	cdk deploy
