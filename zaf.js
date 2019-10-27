const { zipFolder } = require('zip-a-folder');

zipFolder('./img', './img.zip', err => {
  if (err) console.error(err);
});
