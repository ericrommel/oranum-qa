#!/bin/bash
set -e

echo "Starting ENTRYPOINT"

# ToDo: In developing
# Calling the test based on the params
run_a_test() {
  echo "Calling the test"
  npm test -- -h -r -o ${OUTPUT}
}

###
# Main body of the Script
###

run_a_test

echo "end of job"
