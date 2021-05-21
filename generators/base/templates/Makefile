# IMPORTANT:
# The ; and \ on varous commands are important to keep all lines running in a single shell.
# The default behavor of a makefile has each line of a target run in an independend shell.
# When running commands that need to be in the venv the ; and \ are required to keep in the
# existing shell of the prevous command.

.DEFAULT_GOAL := help
SHELL := /bin/bash

clean:  ## Runs the docker image build
	rm -rf ./.tox ./.venv ./.pytest_cache ./<%= sourceFolder %>.egg-info/ ./nosetests.xml ./.coverage
	find . -type d -name "__pycache__" -exec rm -rf {} +

install:  ## Installs the virtual env and all dependencies
	deactivate || echo; \
	virtualenv --python=python3 .venv; \
	source ./.venv/bin/activate; \
	pip install -r requirements.txt; \
	pip install -r ./tests/requirements.txt;

help:  ## Prints this help message.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

test:  ## Executes the tests via tox
	source ./.venv/bin/activate; \
	tox

upgrade-dependencies:  ## Upgrades the venv dependencies. requirement files untouched
	source ./.venv/bin/activate; \
	pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip install -U
