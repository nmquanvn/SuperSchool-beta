#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Usage: $(basename $0) version"
  exit 42
fi

docker run --rm -p 3000:80 -e SERVICE_ENV=dev -e SERVICE_PORT_ENV=3000 -ti team2/backend:$1
