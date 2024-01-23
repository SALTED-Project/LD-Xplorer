# LD-Xplorer


## Introduction

#### Purpose

read-only app
gives an impression of what Linked Data is
allows an easy glimpse into the contents of an NGSI-LD context broker

#### 📝 Description

The efficacy of data hinges on its strategic linkage with other data, transcending mere data points to yield practical information in the real world. The NGSI-type data, rife with explicit (e.g., references to other entities) and implicit (e.g., temporal or spatial proximity) links, facilitates systematic exploration.
Our objective is to operationalize this concept through the development of a web application. This application, consisting of both frontend and a basic backend, will leverage Scorpio for efficient data querying and display. Users, including European taxpayers, potential project partners, and data suppliers, will navigate the linked data graph by initiating queries from a single entity.
This interactive process involves tracing explicit and implicit links, offering users a deep dive into data relationships. The overarching goal is to present a tangible, experiential understanding of data interconnectivity. This technical framework not only serves end-users but also acts as a catalyst for data suppliers, encouraging them to share their data within this collaborative environment.

#### 🏆 Value Proposition

The added value of our NGSI-LD-based web application lies in its capacity to demystify data interconnectivity. By showcasing explicit and implicit links between entities, the application not only facilitates efficient data exploration but also promotes collaboration. Data suppliers are motivated to contribute to a shared knowledge pool, realizing the practical benefits of their participation. Beyond immediate gains, users are equipped with a solid foundation in understanding linked data concepts, positioning them to adapt to future advancements. In essence, our application adds value by making abstract concepts tangible, fostering collaboration, and future-proofing knowledge in the evolving landscape of data connectivity.



#### 🎯 End User Frontend

<img src="https://raw.githubusercontent.com/SALTED-Project/LD-Xplorer/master/images/frontend.JPG" alt="ld-xplorer frontend" height="300px"/>


#### 📧 Contact Information

This application was developed by Kybeidos GmbH (contact: team@agenda-analytics.eu)


## Infrastructure and Setup

LD-Xplorer consists of frontend and backend.

The FRONTEND was written in Vue3. It is compiled into static files in order to be served by the backend. It also utilises the backend as middleware api to receive data from the Context Broker.

The BACKEND is written in Javascript. It serves the frontend and operates as middleware api between frontend and Context Broker.

You can run the backend from your local computer for testing/development purposes. For deployment, we recommend to build a Docker container from it. Please follow the instructions below to make sure you create a running instance of LD-Xplorer.

### System requirements

#### for local testing
Node 18 and npm

#### for recommended deployment
Docker

a Linux-like build environment to run the scripts

### SETUP for local testing/getting to know

#### first build frontend:
enter frontend folder:
```sh
cd frontend
```
Install dependencies (subfolder node_modules appears):
```sh
npm install
```
build frontend as static webapp:
```sh
npm run build-for-backend
```

Check if build process was successful and compiled frontend files ended up in backend/webapp (new folder)

#### then run backend

enter backend folder:
```sh
cd backend
```
Install dependencies (subfolder node_modules appears):
```sh
npm install
```
create config file in backend/src/config_files according to your needs:

```sh
take dummy_config.json as a reference
create your file and name it config.json
```

**Note:** If you are working with your own context broker which doesn't use Keycloak, you can simply omit these properties from the config file and set the property *token_handling* to **false**.

run app in development mode (i.e. changes in backend code trigger re-load of app):
```sh
npm run dev
```
run app in production mode (i.e. changes in code are not immediately reflected):
```
npm run prod
```
    
### SETUP for deployment

This manual uses Docker, which is what we recommend to deploy LD-Xplorer. Adapt the setup to your needs.

#### Familiarize yourself with the provided scripts and files and adapt them to your needs

##### Dockerfile
Within the `Dockerfile`, the same steps as described above are done automatically.

##### build.sh
`build.sh` further automates the process described above: It checks whether the frontend to compile is available, builds a new container using the Dockerfile, and stops and removes an existing older container.

##### example_run.sh
`example_run.sh`shows you how to additionally automatically run your newly-created container according to your specific configuration. It calls `build.sh`and then issues the `Docker run`command with necessary options.

NOTE: Please make sure that you adapt these options to your needs (your port and your config file).


## License


    ```
    MIT License

    Copyright (c) 2023 Kybeidos GmbH

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    ```


## Acknowledgement
This work was supported by the European Commission CEF Programme by means of the project SALTED ‘‘Situation-Aware Linked heTerogeneous Enriched Data’’ under the Action Number 2020-EU-IA-0274.


