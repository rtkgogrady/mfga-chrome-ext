import _ from 'lodash';

const keys = {
  'CIDR': 'whois.cidr',
  'ASN Country Code': 'whois.asn-country-code'
};

function renderExposure(exposure) {
  let {customers, dns, investigations, tickets} = exposure;
  return (
    <tbody>
      <tr>
        <td>Exposure</td>
        <td></td>
      </tr>
      <tr>
        <td>Customers (overlay info)</td>
        <td>{customers}</td>
      </tr>
      <tr>
        <td>DNS</td>
        <td>{dns}</td>
      </tr>
      <tr>
        <td>Investigations</td>
        <td>{investigations}</td>
      </tr>
      <tr>
        <td>Tickets</td>
        <td>{tickets}</td>
      </tr>
      <tr>
        <td>Total Observations</td>
        <td>{exposure['total-observations']}</td>
      </tr>
    </tbody>);
}

export default (feed) => {
  let exposure = renderExposure(feed.exposure);
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
    header: 'AWN',
    info: (<tbody>{info}</tbody>),
    exposure: exposure
  };
};
