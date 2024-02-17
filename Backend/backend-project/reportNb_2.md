for an example:
// define a schema
const animalSchema = new Schema({ name: String, type: String },
  {
  // we can Assign a function to the "query" object of our animalSchema through schema options.
    query: {
      byName(name) {
        return this.where({ name: new RegExp(name, 'i') }); // checking if the name matches the regex pattern then return value of matching
      }
    }
  });

other example :
assuming we have a post or a blog schema 
const blogSchema  =  new Schema(
    {
        comments : [] // cz we have more than one comment probabily here , then i build an array of comments
    }
);

other exemple:
assuming we have a person schema 
const personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
}, {
  virtuals: { // the virtuals object 
    fullName: { 
      get() { // building a function that returns the full name of the person
        return this.name.first + ' ' + this.name.last;
      }
    }
  }
});

other example:
const userSchema = new Schema({ name: String }, { timestamps: true });// the timestamps for the created at and update at functions 
