#!/usr/bin/env python3

import setuptools

setuptools.setup(
    name='<%= consoleCommand %>',
    author='<%= author %>',
    description='',
    url='',
    version='0.0.1',
    packages=setuptools.find_packages(),
    include_package_data=True,
    package_dir={'<%= sourceFolder %>': '<%= sourceFolder %>'},
    entry_points={
        'console_scripts': [
            '<%= consoleCommand %> = <%= sourceFolder %>.app:main'
        ]
    }
)