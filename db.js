const { Client } = require("pg");

async function getClient() {
  const client = new Client(
    "postgresql://anjelikacodeyoung:fkdJZRVq1St2@ep-red-wind-a5v5kba8.us-east-2.aws.neon.tech/ecommercedb?sslmode=require",
  );
  await client.connect();
  return client;
}

module.exports = {
  getClient,
};
