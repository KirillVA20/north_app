db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

// Create user for user-app
db.createUser({
  user: process.env.USER_APP_MONGO_USER,
  pwd: process.env.USER_APP_MONGO_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE
    }
  ]
});

// Create user for guide-app
db.createUser({
  user: process.env.GUIDE_APP_MONGO_USER,
  pwd: process.env.GUIDE_APP_MONGO_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE
    }
  ]
});

// Create test collections to verify database creation
db.createCollection('users');
db.createCollection('guides');
