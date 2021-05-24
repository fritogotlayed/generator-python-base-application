# IMPORTANT:
# The ; and \ on varous commands are important to keep all lines running in a single shell.
# The default behavor of a makefile has each line of a target run in an independend shell.
# When running commands that need to be in the venv the ; and \ are required to keep in the
# existing shell of the prevous command.
# Reminder: a dash "-" in front of a command means errors will be ignored

.DEFAULT_GOAL := help
.PHONY := analysis autoformat clean clean-pyc dev-install dev-uninstall help lint requirements setup test upgrade-dependencies

analysis:  ## Runs the static code analysis tool
	-. ./.venv/bin/activate; \
	tox -r -elint

autoformat:  ## Runs the auto pep8 tool
	. ./.venv/bin/activate; \
	black .

clean-pyc:  ## Cleans the environment of pyc, pyo and ~ files.
	find . -name '*.pyc' -exec rm --force {} +
	find . -name '*.pyo' -exec rm --force {} +
	find . -name '*~' -exec rm --force {} +
 
clean: clean-pyc  ## Cleans the environment to scratch
	rm -rf ./*.egg-info ./.tox/ ./.venv/ ./*requirements.txt ./nosetest.xml ./.coverage
	find . -type d -name "__pycache__" -exec rm -rf {} +

dev-install:  ## Installs the app in a way that modifications to the files are run easily
	pip3 install -e .

dev-uninstall:  ## Installs the app in a way that modifications to the files are run easily
	pip3 uninstall fritos-racker-tool

help:  ## Prints this help message.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

lint: analysis ## Alias to the analysis target

requirements:  ## Updates the requirements file with installed dependencies
	. ./.venv/bin/activate; \
	pip-compile; \
	pip-compile dev_requirements.in

setup:  ## Creates the initial virtual env
	rm -rf ./.venv/;
	python3 -m venv ./.venv;
	. ./.venv/bin/activate; \
	pip3 install pip-tools; \
	pip-compile && pip-compile dev_requirements.in; \
	pip-sync requirements.txt dev_requirements.txt; \
	if [ -d "./.git" ]; then pre-commit install; fi;

test: requirements  ## Runs the tox suite against each of the target interpreters.
	. ./.venv/bin/activate; \
	tox -r --skip-missing-interpreter

upgrade-dependencies:  ## Upgrades the venv dependencies. requirement files untouched
	. ./.venv/bin/activate; \
	pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip install -U
