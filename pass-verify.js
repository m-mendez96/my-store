const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'my PasswordAdmin';
  const hash = '$2b$10$uANRbwlqGTg.5R.p2ucXzuAvnqJYcHwsfD4KjTl/OWLizRV/Dox8W';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
