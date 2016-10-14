import Q from 'q';
import request from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';

superagentPromisePlugin.Promise = Q;

const initialState = 0;
//const url = 'http://10.9.10.191:5000/api/v1';
const url = 'https://10.7.7.45/api/v1';


class ThreatService {
  static makeSimpleUrl(ip) {
    return `${url}/threat/simple/lookup/${ip}`;
  }

  static makeDetailsUrl(ip) {
    return `${url}/threat/details/lookup/${ip}`;
  }

  static getSimpleFor(ip) {
    return request.get(ThreatService.makeSimpleUrl(ip))
      .accept('json');
  }

  static getDetailsFor(ip) {
    return request.get(ThreatService.makeDetailsUrl(ip))
      .accept('json');
  }
}

export default ThreatService;
