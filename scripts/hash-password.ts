/// <reference types="bun" />

const password = "admin123";

async function main() {
  const hash = await Bun.password.hash(password);

  console.log(hash);
}

main();

export {};
