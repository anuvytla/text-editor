import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect to jate DB with version 1.
  const jateDb = await openDB('jate', 1);
  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const transaction = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const objStore = transaction.objectStore('jate');
  // use the .add() method to pass in content
  const req = objStore.put({ content: content })
  // wait for the data add.
  const res = await req;
  console.log('data saved to the jateDB', res);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // connect to jate DB with version 1.
  const jateDb = await openDB('jate', 1);
  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const transaction = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const objStore = transaction.objectStore('jate');
  // use the .getAll() method to grab all the content in the DB
  const req = objStore.getAll()
  // confirm the data was fetched
  const res = await req;
  console.log('data fetched from the jateDB', res);

};

initdb();
