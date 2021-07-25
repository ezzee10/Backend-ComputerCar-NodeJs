require('dotenv').config({ path: '.env' });
const mongoConnectionString = process.env.DB_MONGO;

const agenda = new Agenda({ db: { address: mongoConnectionString } });
