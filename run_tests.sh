#!/bin/bash

mocha -t 3000 -R spec --colors --recursive test
jasmine-node