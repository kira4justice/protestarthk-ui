const R = require('ramda');

const calcFile = (id) => {
  let file = `0${(id % 11) + 1}`;
  file = file.substr(file.length - 2);
  return `/images/arts/${file}.jpg`;
};

const shuffle = (ary) => ary.sort(() => Math.random() - Math.random());

const all = R.range(1, 100).map((id) => {
  const relatedId = ((id + 1) % 99) + 1;

  return {
    id,
    title: `Protest Art ${id}`,
    file_url: calcFile(id),
    caption: `Description of protest art ${id}.`,
    author: `Artist ${id}`,
    tags: shuffle([
      { id: 0, name: '831' },
      { id: 1, name: 'popo' },
      { id: 2, name: 'eye' },
      { id: 3, name: 'protest' },
    ]).slice(0, 2),
    related_art: [
      {
        id: relatedId,
        title: `Protest Art ${relatedId}`,
        thumbnail: calcFile(relatedId),
        create_date: new Date(),
      },
    ],
  };
});

module.exports = {
  all,
  findBy: (prop, val) => R.find(R.propEq(prop, val))(all),
  filterBy: (prop, val) => R.filter(R.propEq(prop, val))(all),
  search: (params) => {
    let { query, tags, page, pageSize } = params;
    tags = tags || [];
    tags = tags instanceof Array ? tags : [tags];
    page = parseInt(page || 0);
    pageSize = pageSize || 10;

    let ret = all;
    if (query) {
      const match = R.contains(query);
      ret = ret.filter((d) => match(d.title) || match(d.caption));
    }
    if (tags.length > 0) {
      const containTags = (record) =>
        tags.every((searchTag) => {
          return R.find(R.propEq('name', searchTag))(record.tags);
        });
      ret = ret.filter(containTags);
    }
    ret = ret.slice(page * pageSize, (page + 1) * pageSize);
    return ret;
  },
  add: (params) => {
    const { title, caption, author, tags } = params;
    const id = all.length + 1;
    const relatedId = id - 1;
    const art = {
      id,
      title,
      file_url: calcFile(id),
      caption,
      author,
      tags: tags.map((d, i) => ({ id: i, name: d })),
      related_art: [
        {
          id: relatedId,
          title: `Protest Art ${relatedId}`,
          thumbnail: calcFile(relatedId),
          create_date: new Date(),
        },
      ],
    };
    all.push(art);
    return { id };
  },
};
