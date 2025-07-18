#!/usr/bin/env bash
# Usage: ./wait-for-it.sh host:port -- command_to_run
set -e

host=$(echo $1 | cut -d: -f1)
port=$(echo $1 | cut -d: -f2)
shift

for i in {1..30}; do
  if nc -z "$host" "$port"; then
    exec "$@"
    exit
  fi
  echo "Waiting for $host:$port... ($i/30)"
  sleep 1
done

echo "Timeout: $host:$port still not available after 30 seconds."
exit 1

