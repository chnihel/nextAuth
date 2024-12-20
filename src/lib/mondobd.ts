import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const options = {};
//client : Il s'agit d'une variable qui stocke une instance de
// MongoClient. Il est initialement défini comme undefined.
let client: MongoClient |undefined;
let clientPromise: Promise<MongoClient>;

if (!client) {
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}else{
    clientPromise=Promise.resolve(client)
}

export default clientPromise;
