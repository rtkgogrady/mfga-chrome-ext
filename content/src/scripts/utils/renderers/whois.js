import _ from 'lodash';

const keys = {
  'CIDR': 'whois.cidr',
  'ASN Country Code': 'whois.asn-country-code'
};

function renderObject(object, key) {
  let addresses = _.get(object, 'contact.address', []);
  let emails = _.get(object, 'contact.email', []);
  let name = _.get(object, 'contact.name', '');
  let links = object.links;

  if (!_.isEmpty(addresses)) {
    addresses = _.map(addresses, (adr, i) =>
      (<li key={i}>{adr.value}</li>));
    addresses = (<ul>{addresses}</ul>);
  }

  if (!_.isEmpty(emails)) {
    emails = _.map(emails, (em, i) =>
      (<li key={i}>{em.value}</li>));
    emails = (<ul>{emails}</ul>);
  }

  if (!_.isEmpty(links)) {
    links = _.map(links, (link, i) =>
        (<li key={i}><a target='_blank' href={link}>{link}</a></li>));
    links = (<ul>{links}</ul>);
  }

  let info = (
    <tbody>
      <tr>
        <td><strong>{key} Contact</strong></td>
        <td></td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{name}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td>{addresses}</td>
      </tr>
      <tr>
        <td>Emails</td>
        <td>{emails}</td>
      </tr>
      <tr>
        <td>Links</td>
        <td>{links}</td>
      </tr>
    </tbody>
  );

  return info;
}

export default (feed) => {
  let objectInfo = _.map(feed.whois.objects, renderObject);
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
    header: 'WHOIS',
    info: (<tbody>{info}</tbody>),
    object: objectInfo
  };
};
