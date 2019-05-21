const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default emails => {
  const inValidateEmail = emails
    .split (',')
    .map (email => email.trim ())
    .filter (email => re.test (email) === false);
  //   console.log (inValidateEmail);
  if (inValidateEmail[0] !== '' && inValidateEmail.length) {
    return `This email id is invalid ${inValidateEmail}`;
  }
  return;
};
