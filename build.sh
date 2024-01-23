#cp Dockerfile ../

#cd ..

# test if frontend is where we expect it
if ! test -f frontend/package.json
    then
    echo "Frontend is not found where expected. Don't know what to serve, sorry. Will terminate."
    exit 0
fi
#build new container
docker build -t ldxplorer .

# stop and delete older running version of container
docker stop LD-Xplorer
docker rm LD-Xplorer

#rm Dockerfile