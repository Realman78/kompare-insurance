#!/bin/bash
set -e

echo "Restoring MongoDB data from dump..."

tar -xzf /docker-entrypoint-initdb.d/dump.tar.gz -C /docker-entrypoint-initdb.d/

mongorestore --uri="mongodb://localhost:27017" /docker-entrypoint-initdb.d/dump/

echo "MongoDB data restored."
