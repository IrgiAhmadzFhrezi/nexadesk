/// <reference types="bun" />

const password = "irgi123";

const hash =
  "$argon2id$v=19$m=65536,t=2,p=1$H2JbaChkYIk+Mf+/fUwKIJNrCPTKriyaYhqci316NOM$dGMZypEXjFykL+xeG0oL0jKwHP1DbJ/x2TVSjYr/lps";

async function main() {
  const isValid = await Bun.password.verify(password, hash);

  console.log("Password valid:", isValid);
}

main();

export {};
