const parseCustomerSessionCookie = (cookiesString) => {
  const cookieStringSplit = cookiesString.split(' ');
  const customerSessionCookieString = cookieStringSplit.filter((segment) => {
    return segment.includes('customerSessionToken');
  })[0];
  const sessionCookieString = customerSessionCookieString.split(
    'customerSessionToken=',
  )[1];

  const sessionCookie = sessionCookieString
    .replace(/%3D/g, '=')
    .replace(/%2B/g, '+')
    .replace(/%2F/g, '/')
    .replace(/;/g, '');

  return sessionCookie;
};

const parseEmployeeSessionCookie = (cookiesString) => {
  const cookieStringSplit = cookiesString.split(' ');
  const employeeSessionCookieString = cookieStringSplit.filter((segment) => {
    return segment.includes('employeeSessionToken');
  })[0];
  const sessionCookieString = employeeSessionCookieString.split(
    'employeeSessionToken=',
  )[1];

  const sessionCookie = sessionCookieString
    .replace(/%3D/g, '=')
    .replace(/%2B/g, '+')
    .replace(/%2F/g, '/')
    .replace(/;/g, '');

  return sessionCookie;
};

module.exports.parseCustomerSessionCookie = parseCustomerSessionCookie;
module.exports.parseEmployeeSessionCookie = parseEmployeeSessionCookie;
