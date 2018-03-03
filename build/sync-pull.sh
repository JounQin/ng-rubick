#!/usr/bin/env bash

rm -rf dist
git clone --depth=0 https://github.com/JounQin/ng-rubick.git dist -b gh-pages
rm -rf dist/.git
