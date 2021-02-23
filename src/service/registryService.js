const envVariables = require('../envVariables')
const registryUrl = envVariables['OPENSABER_SERVICE_URL']
const axios = require('axios');


class RegistryService {

  constructor () {
  }

  async getOrgDetails(dikshaOrgId) {
    const option = {
      url: registryUrl + '/search',
      method: 'post',
      headers: this.getDefaultHeaders(),
      data: {
        "id": "open-saber.registry.search",
        "request": {
          "entityType": ["Org"],
          "filters": {
            "orgId": { "eq": dikshaOrgId }
          }
        }
      }
    };
    return axios(option);
  }

  async getUserList(userIds) {
    const option = {
      url: registryUrl + '/search',
      method: 'post',
      headers: this.getDefaultHeaders(),
      data: {
        "id": "open-saber.registry.search",
        "request": {
          "entityType": ["User"],
          "filters": {
            "osid": { "or": userIds }
          }
        }
      }
    };
    return axios(option);
  }

  async getOrgUserList(orgId) {
    const option = {
      url: registryUrl + '/search',
      method: 'post',
      headers: this.getDefaultHeaders(),
      data: {
        "id": "open-saber.registry.search",
        "request": {
          "entityType": ["User_Org"],
          "filters": {
            "orgId": { "eq": orgId }
          },
          "limit": 250,
          "offset": 0
        }
      }
    };
    return axios(option);
  }

  addRecord(value, callback) {
    const headers = this.getDefaultHeaders()
    axios.post(registryUrl + '/add', value.body, headers)
      .then((res) => {
        callback(null, res)
      },
        (error) => {
          callback(error)
        });

  }

  updateRecord(value, callback) {
    const headers = this.getDefaultHeaders()

    axios.post(registryUrl + '/update', value.body, headers)
      .then((res) => {
        callback(null, res)
      },
        (error) => {
          callback(error)
        });

  }

  readRecord(value, callback) {
    const headers = this.getDefaultHeaders()

    axios.post(registryUrl + '/read', value.body, headers)
      .then((res) => {
        callback(null, res)
      },
        (error) => {
          callback(error)
        });
  }

  searchRecord(value, callback) {
    const headers = this.getDefaultHeaders()

    axios.post(registryUrl + '/search', value.body, headers)
      .then((res) => {
        callback(null, res)
      },
        (error) => {
          callback(error, null)
        });
  }

  searchAuditRecords(value, callback) {
    const headers = this.getDefaultHeaders()

    axios.post(registryUrl + "/audit", value.body, headers)
      .then((res) => {
        callback(null, res)
      },
        (error) => {
          callback(error)
        });
  }

  getDefaultHeaders() {
    let headers = {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
    return headers;
  }
}


module.exports = RegistryService;
