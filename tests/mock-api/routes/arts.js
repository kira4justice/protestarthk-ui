const Arts = require('../resources/arts');

module.exports = (app) => {
  app.get('/api/arts', (request, response) => {
    const arts = Arts.search(request.query);
    response.json(arts);
  });

  app.get('/api/arts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const art = Arts.findBy('id', id);
    if (art) {
      return res.json(art);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  });
};
