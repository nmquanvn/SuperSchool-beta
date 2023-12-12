#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Usage: $(basename $0) version"
  exit 42
fi

docker build --rm -t team2/backend:$1 .
