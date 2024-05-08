#!/bin/bash

set -e
echo "Initializing and updating submodules..."
git submodule update --init --recursive
echo "Pulling latest changes for submodules..."
git submodule foreach 'git pull origin $(git config --file $toplevel/.gitmodules --get submodule.$name.branch)'
echo "Submodule update complete."
