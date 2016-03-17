// Start Mongo shell
mongo

// List databases
show dbs

// Select database
use [dbname]

// List collections
show collections

// Return all documents
db.restaurants.find();

// Make the results pretty
db.restaurants.find().pretty();

// Find documents with a given value
db.restaurants.find({
  borough: 'Brooklyn'
});

// Save a new document
db.restaurants.save({
  key: 'value',
  etc: 'etc...'
});

// If you specify an `_id` it will update, if not it will save a new document
db.restaurants.insert({
  key: 'value',
  etc: 'etc...'
});

// Get documents and values via aggregation
db.restaurants.aggregate({
  $project: {
    _id: 0,
    name: 1,
    cuisine: 1
  }
});

// Rename returned fields
db.restaurants.aggregate({
  $project: {
    _id: 0,
    name: 1,
    'Type of food': '$cuisine'
  }
});

// Filters documents to return only ones that match
db.restaurants.aggregate({
  $match: {
    borough: 'Brooklyn'
  }
});

db.restaurants.aggregate({
  $match: {
    restaurant_id: {$gte: '40367796', $lte: '40367798'}
  }
});

// Count the number of matched records
db.restaurants.aggregate([
  {
    $match: {
      borough: 'Brooklyn'
    }
  },
  {
    $group: {
      _id: null,
      count: {
        $sum: 1
      }
    }
  }
]);

// Limit a number of records
db.restaurants.aggregate([
  { $limit: 5 }
]);
// or
db.restaurants.find().limit(5);

// Sorting records
db.restaurants.aggregate([
  {
    // asc
    $sort: {restaurant_id: 1}
    // desc
    // $sort: {restaurant_id: -1}
  }
]);

// Grouping
db.restaurants.aggregate([
  {
    $group: {_id: null, restaurantId: {$max: '$restaurant_id'}}
  }
]);

db.restaurants.aggregate([
  {
    $group: {
      _id: '$borough',
      cuisines: {$push: '$cuisine'}
    }
  }
]);

db.restaurants.aggregate([
  {
    $group: {
      _id: '$cuisine',
      boroughs: {$push: '$borough'}
    }
  }
]);

// Concatenating
db.restaurants.aggregate([
  {
    $project: {
      location: {
        $concat: ['$address.building', ' ', '$address.street']
      }
    }
  }
]);

// Updating a value in a record
db.restaurants.update({
  _id: ObjectId("56d2cf8ee2b075667d4f0537")
}, {
  $set: {
    cuisine: 'Mexican'
  }
});

// Update a record which has the specified value
// N.B. only sets value on first record it finds
db.restaurants.update({
  cuisine: 'Irish'
}, {
  $set: {
    beer: 'Guinness'
  }
});

// Update all records which have specified value
db.restaurants.update(
  {
    cuisine: 'Irish'
  },
  {
    $set: {
      beer: 'Guinness'
    }
  },
  {
    multi: true
  }
);

// Update all records which have specified value, and insert a new record if it doesn't exist
db.restaurants.update(
  {
    cuisine: 'Ozzy'
  },
  {
    $set: {
      beer: 'VB'
    }
  },
  {
    upsert: true
  }
);

// Update a value in a nested array
db.restaurants.update(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0545"),
    'grades.date': ISODate("2014-09-02T00:00:00Z")
  },
  {
    $set: { 'grades.$.score': 1 }
  }
);

// Increment a value in a nested array
db.restaurants.update(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0545"),
    'grades.date': ISODate("2014-09-02T00:00:00Z")
  },
  {
    $inc: { 'grades.$.score': 1 }
  }
);

// Remove first or last item from nested array
// N.B. use `1` to remove first, `-1` to remove last
db.restaurants.update(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0545"),
  },
  {
    $pop: { grades: -1 }
  }
);

// Add an item to an array
var newItem = {
    "date" : ISODate("2012-03-29T00:00:00Z"),
    "grade" : "test-grade",
    "score" : 100000
};

db.restaurants.update(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0545"),
  },
  {
    $push: { grades: newItem }
  }
);

// Remove an item from an array
var item = {
    "date" : ISODate("2012-03-29T00:00:00Z"),
    "grade" : "test-grade",
    "score" : 100000
};

db.restaurants.update(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0545"),
  },
  {
    $pull: { grades: item }
  }
);

// Add multiple items to an array
var items = [
    {
      "grade" : "B",
      "score" : 16,
      "date" : ISODate("2013-12-19T00:00:00Z")
    },
    {
      "date" : ISODate("2013-05-28T00:00:00Z"),
      "grade" : "A",
      "score" : 9
    }
];

db.restaurants.update(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0545"),
  },
  {
    $pushAll: { grades: items }
  }
);

// Remove multiple items from an array
var items = [
    {
      "grade" : "B",
      "score" : 16,
      "date" : ISODate("2013-12-19T00:00:00Z")
    },
    {
      "date" : ISODate("2013-05-28T00:00:00Z"),
      "grade" : "A",
      "score" : 9
    }
];

db.restaurants.update(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0545"),
  },
  {
    $pullAll: { grades: items }
  }
);

// Remove an item from the document
db.restaurants.update(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0545"),
  },
  {
    $unset: { name: '' }
  }
);

// Remove a document
db.restaurants.remove(
  {
    _id: ObjectId("56d2cf8ee2b075667d4f0544")
  }
);

// Remove all documents
db.restaurants.remove();

// Drop database
db.dropDatabase();


