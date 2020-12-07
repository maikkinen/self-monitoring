let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "wapwbqll",
    user: "wapwbqll",
    password: "QeHFQbN-ADSS7ECBJ4XWdhNzZ71nDJFp",
    port: 5432
  };
}

export { config };