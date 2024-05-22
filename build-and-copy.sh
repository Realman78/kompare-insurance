#!/bin/bash

cd "$(dirname "$0")"

frontend_dir="kompare-frontend"
backend_dir="kompare-backend"

set -e

echo "Building frontend..."
cd "$frontend_dir"
npm run build

echo "Copying build files to backend..."
cd - 
cp -r "${frontend_dir}/build" "${backend_dir}/"

echo "Build and copy successful!"
