# use this file for deployment
# configure to your needs

# recommendation: use build.sh or build_dev.sh to build the container
sh build.sh
# then run it according to your architecture
# make sure to adjust the port numbers and map the config file you would like to use into the container
docker run -d -p <outer_port>:<inner_port_according_to_config_file> --restart unless-stopped -v <path_to_config_file>:/usr/apps/LD-Xplorer/backend/src/config_files/config.json --name LD-Xplorer ldxplorer