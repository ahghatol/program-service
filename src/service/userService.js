const envVariables = require('../envVariables')
const learningUrl = envVariables['LEARNING_SERVICE_URL']
const axios = require('axios');

class UserService {

  constructor () {
  }

  async getDikshaUserProfiles(req, identifier) {
    const option = {
      url: learningUrl + '/user/v1/search',
      method: 'post',
      headers: { ...req.headers },
      data: {
        "request": {
          "filters": {
            "identifier": identifier
          }
        }
      }
    };
    return axios(option);
  }

  getDefaultHeaders() {
    let headers = {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
    return headers;
  }
}

module.exports = UserService;
