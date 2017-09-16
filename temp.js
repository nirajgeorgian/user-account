const fs = require('fs');

const readFile = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('./package.json', function(err, data) {
      return err ? reject(err) : resolve(data.toString())
    })
  })
}

readFile()
  .then(function(data) {
    // it will give you data because of above function
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  })
