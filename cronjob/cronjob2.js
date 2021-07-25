import { MongoClient } from 'mongodb';
import { MongoCron } from 'mongodb-cron';
import { getNotes } from '../controllers/noteController';
const Note = require('./models/Note');


const db = mongo.db('test');
const note = await Note.find();

const cron = new MongoCron({
    collection, 
    onDocument: async (doc) => console.log(doc), 
    onError: async (err) => console.log(err), 
});

cron.start();