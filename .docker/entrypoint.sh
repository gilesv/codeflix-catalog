#!/bin/bash
/bin/bash ./.docker/wait-for-it.sh $WAIT_FOR_DB_URL -t $WAIT_FOR_TIMEOUT

# execute docker command
exec "$@"
