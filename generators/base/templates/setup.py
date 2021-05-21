#!/usr/bin/env python3
"""Module for application setup/install
This module is pretty standard for python applications that you wish to install
via the pip module. It basically lets you do things like "pip install -e ." and
"pip install ."
"""

import setuptools

setuptools.setup(
    name="<%= consoleCommand %>",
    author="<%= author %>",
    description="",
    url="",
    version="0.0.1",
    packages=setuptools.find_packages(exclude=["tests"]),
    include_package_data=True,
    package_dir={"<%= sourceFolder %>": "<%= sourceFolder %>"},
    install_requires=[
        # NOTE: List your dependencies here. If you are accustom to using
        # requirements.txt and dev_requirements.txt this would be your
        # requirements.txt items without the versions. Requirements.txt and
        # dev_requirements.txt will be built automatically via a Makefile
        # target.
    ],
    entry_points={"console_scripts": ["<%= consoleCommand %> = <%= sourceFolder %>.app:main"]},
)
