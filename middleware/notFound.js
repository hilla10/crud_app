const path = require('path');

const notFound = (req, res, next) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '../', 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: 'Not found' });
  } else {
    res.type('txt').send('Not found');
  }
};

module.exports = notFound;
