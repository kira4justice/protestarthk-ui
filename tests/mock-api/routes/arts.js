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

  app.post('/api/arts', (req, res) => {
    // TODO: read req and create mock API
    // const ret = Arts.add(req.body);
    const id = Math.floor(Math.random() * Arts.all.length) + 1;
    const ret = { id };
    res.json(ret);
  });

  app.post('/api/arts/upload', (req, res) => {
    const id = Math.floor(Math.random() * Arts.all.length) + 1;
    const file = Arts.all[id].file;
    res.json({ file });
  });
};
