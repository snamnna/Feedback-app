#!/bin/bash

while ! nc -z localhost 3001; do   
  sleep 1
  echo "Waiting for server..."
done