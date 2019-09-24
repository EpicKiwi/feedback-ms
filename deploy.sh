#!/bin/bash

echo "Building image"
docker build . -t epickiwi/epickiwi-feedback-ms

echo "Starting stack"
docker stack deploy --compose-file docker-compose.yml feedback-ms