import express from 'express';
import api_functions from './functions/api_functions.mjs';
import CONFIG from './config_files/config.json' assert {type: 'json'};

// NOTE: frontend_content_path in CONFIG has to be relative to location of package.json (see below usage of process.cwd())
const api = express();
api.use('/', express.static(CONFIG.frontend_content_path));

// serve index.html
api.get('/', function (req,res) {
    res.sendFile(CONFIG.frontend_content_path + "index.html", {root: process.cwd()});
  });

// actually start server
api.listen(CONFIG.port, function(err) {
    if (err) console.log(err);
    console.log(`Server is running on port ${CONFIG.port}.`);
});

// test route for server
api.get(`${CONFIG.api_prefix}/ping`, (req, res) => {
   res.send('PONG!');
});

// app.get( path, callback )
// path: It is the path for which the middleware function is being called. 
// callback: They can be a middleware function or series/array of middleware functions. 

// get random entity
api.get(`${CONFIG.api_prefix}/scorpiotestrandom`, async (req, res) => {
    console.log(`received request on ${CONFIG.api_prefix + '/scorpiotestrandom'}, will contact scorpio`);
    const answer = await api_functions.contact_scorpio();
    console.log('Received answer by scorpio, parsing result...');
    console.log(answer);
    res.send(answer);
 });

 // get entity by type
api.get(`${CONFIG.api_prefix}/entityByType`, async (req, res) => {
    console.log(`received request on ${CONFIG.api_prefix + '/entityByType'}, will contact scorpio`);
    const answer = await api_functions.get_entities_by_type_from_scorpio(req);
    console.log('Received answer by scorpio, parsing result...');
    console.log(answer);
    res.send(answer);
 });


 // get entity by type and ID
api.get(`${CONFIG.api_prefix}/byID`, async (req, res) => {
    console.log(`received request on ${CONFIG.api_prefix + '/byID'}, will contact scorpio`);
    const answer = await api_functions.get_entity_by_id_from_scorpio(req);
    console.log('Received answer by scorpio, parsing result...');
    console.log(answer);
    res.send(answer);
 });


api.get(`${CONFIG.api_prefix}/types`, async (req, res) => {
  console.log('received request to endpoint ' + CONFIG.api_prefix + '/types');
  api_functions.get_types_list_from_scorpio().then(answer => {
    console.log('Received answer by scorpio, parsing result...');
    res.send(answer);
  });
});


api.get(`${CONFIG.api_prefix}/location/near`, async (req, res) => {
  console.log('received request to endpoint ' + CONFIG.api_prefix + '/location/near');
  const answer = await api_functions.get_near_entities_from_scorpio(req);
  console.log(CONFIG.api_prefix + '/location/near ' + 'Received answer by scorpio, parsing result...');
  console.log(answer);
  res.send(answer);
});


api.get(`${CONFIG.api_prefix}/temporal/near`, async (req, res) => {
  console.log('received request to endpoint ' + CONFIG.api_prefix + '/temporal/near');
  const answer = await api_functions.get_temporal_near_entities_from_scorpio(req);
  console.log(CONFIG.api_prefix + '/temporal/near ' + 'Received answer by scorpio, parsing result...');
  console.log(answer);
  res.send(answer);
});
