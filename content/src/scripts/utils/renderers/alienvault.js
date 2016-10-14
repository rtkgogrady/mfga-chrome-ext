import _ from 'lodash';

const keys = {
  'CIDR': 'whois.cidr',
  'ASN Country Code': 'whois.asn-country-code'
};

function renderGeoip(geoip) {
  let city = geoip['city-name'],
      country = geoip['country-code'],
      location = geoip.location;
  return (
    <tbody>
      <tr>
        <td>City</td>
        <td>{city}</td>
      </tr>
      <tr>
        <td>Country</td>
        <td>{country}</td>
      </tr>
      <tr>
        <td>Location</td>
        <td>{location}</td>
      </tr>
    </tbody>);
}

export default (feed) => {
  let geoip = renderGeoip(feed.geoip);

  let info =
    _.chain(keys)
      .map(keys, (key, title) => {
        let val = _.get(feed, key, null);
        if (!val) return null;
        return (
          <tr>
            <td className="key">{title}</td>
            <td>{val}</td>
          </tr>
        );
      }).filter(val => !_.isNull(val))
    .value();

  return {
    header: 'Alien Vault',
    info: (<tbody>{info}</tbody>),
    geoip: geoip
  };
};
