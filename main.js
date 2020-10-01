const request = require('request');
require('dotenv').config();
const path = require('path');
const validResponseRegex = /(2\d\d)/;
const ServiceNowConnector = require(path.join(__dirname, './connector.js'));

// Update this constant with your ServiceNow credentials
const options = {
  url: 'https://dev70601.service-now.com',
  username: 'admin',
  password: process.env.SERVICENOW_PSWD,
  serviceNowTable: 'change_request'
};

/**
 * @function mainOnObject
 * @description Instantiates an object from the imported ServiceNowConnector class
 *   and tests the object's get and post methods.
 */
function mainOnObject() {
  // Instantiate an object from class ServiceNowConnector.
  const connector = new ServiceNowConnector(options);
  // Test the object's get and post methods.
  // You must write the arguments for get and post.
  const cb = (data, error, type) => {
    if (error) {
      console.error(`\nError returned from ${type} request:\n${JSON.stringify(error)}`);
    }
    console.log(`\nResponse returned from ${type} request:\n${JSON.stringify(data)}`)
  };
  const cbp = (data, error)=> cb(data, error, 'POST');
  const cbg = (data, error)=> cb(data, error, 'GET');
  connector.get({},cbg);
  connector.post({},cbp);

}

// Call mainOnObject to run it.
mainOnObject();