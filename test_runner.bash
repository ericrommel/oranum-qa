#!/bin/bash

usage="
Usage: npm test -- [OPTIONS]

Optional arguments:
    -h                  Use this flag (no arguments) to run in headless mode.
                        Defaults to false if not specified.
    -p                  Use this flag to pause on fail in debug mode. Defaults
                        to false if not specified.
    -o <Output file>    Save all output to a file.
    -r                  Generate test report using allure. This just generates
                        the report under ./report/, it doesn't serve it. Note:
                        ./report/ directory will be OVERWRITTEN if it exists!
    -R                  Run tests multiple times to detect and fix flaky tests.
                        // inside codecept.conf.js:
                        minSuccess: 3,  // how many times all tests should pass
                        maxReruns: 3,   // how many times to try to rerun all tests

Example # - Runs tests in headless mode, generates allure report folder,
            and pauses on failures:

    npm test -- -h -r -p

"

function usage() {
    echo "${usage}";
    exit 1;
}

headless_mode='false'
pause_on_fail='false'
generate_report='false'
run_rerun='false'

while getopts "Rhopr" opt; do
    case $opt in
        R)
            run_rerun='true'
            ;;
        h)
            headless_mode='true'
            ;;
        o)
            output_file=${OPTARG}
            ;;
        p)
            pause_on_fail='true'
            ;;
        r)
            generate_report='true'
            ;;
        \?)
            echo "Invalid option: '-${OPTARG}'" >&2
            exit 1
            ;;
        *)
            usage
            ;;
    esac
done

export HEADLESS_MODE=${headless_mode}
export PAUSE_ON_FAIL=${pause_on_fail}

echo "Headless set to ${headless_mode}"
echo "Pause on fail set to ${pause_on_fail}"
echo "Re-run set to ${run_rerun}"
echo "Generate report set to ${generate_report}"

if [[ $run_rerun == 'true' ]]; then
    runCommands='run-rerun'
    echo "NOTE: Executing tests multiple times to detect and fix flaky tests. See maxReruns in codecept.conf.js."
else
    runCommands='run'
fi

if [ -n "$output_file" ] ; then
    echo "Saving output to file: ${output_file}"
    node node_modules/codeceptjs/bin/codecept.js \
        ${runCommands} --config=./codecept.conf.js \
        --steps --verbose \
        2>&1 | tee ${output_file} \

else
    node node_modules/codeceptjs/bin/codecept.js \
        ${runCommands} --config=./codecept.conf.js \
        --steps --verbose

fi
codecept_result=$?


if [[ $generate_report == 'true' ]]; then
    allure generate --clean -o "report_folder" "./"
fi

if [[ $codecept_result -ne 0 ]]; then
    printf "\nThe test run contains FAILED Scenarios. ";
    printf "Returning fail code [1].\n";
    exit 1;
else
    printf "\nThe test run only contains PASS Scenarios. ";
    printf "Returning success code [0].\n";
    exit 0;
fi
