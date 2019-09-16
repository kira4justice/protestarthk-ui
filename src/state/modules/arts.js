import delay from 'delay';
import * as R from 'ramda';

const SET_ARTS = 'SET_ARTS';
const APPEND_ARTS = 'APPEND_ARTS';
const CLEAR_CURRENT = 'CLEAR_CURRENT';
const SET_CURRENT = 'SET_CURRENT';

export const state = {
  arts: [],
  page: 0,
  current: null,
};

export const getters = {};

export const mutations = {
  [SET_ARTS]: (state, newArts) => {
    state.arts = newArts;
    state.page = 0;
  },
  [APPEND_ARTS]: (state, newArts) => {
    state.arts = state.arts.concat(newArts);
    state.page++;
  },
  [CLEAR_CURRENT]: (state) => {
    state.current = null;
  },
  [SET_CURRENT]: (state, art) => {
    state.current = art;
  },
};

export const actions = {
  async searchArts({ commit }, query) {
    const page = R.propOr(0, 'page')(query);

    // TODO: call api
    await delay(1000);
    const ret = R.range(1, 12).map((d) => {
      let id = `0${d}`;
      id = id.substr(id.length - 2);
      return {
        id,
        title: `Protest Art ${id}`,
        src: `/images/arts/${id}.jpg`,
        tags: ['831', 'hk'],
      };
    });

    if (page === 0) {
      commit(SET_ARTS, ret);
    } else {
      commit(APPEND_ARTS, ret);
    }
    return ret;
  },

  async fetchArtDetails({ commit }, id) {
    commit(CLEAR_CURRENT);

    // TODO: call api
    await delay(1000);
    const ret = {
      id,
      title: 'Protest Art Name',
      artist: 'Artist Name',
      desc:
        'Some description about the protest art. ‘Our goal isn’t to challenge the Communist Party, just to defend our own rights and autonomy,’ says man behind the iconic bloodstained bauhinia flag that became the symbol of the 2019 Hong Kong protests.',
      src: `/images/arts/${id}.jpg`,
      tags: ['831', 'hk'],
    };

    commit(SET_CURRENT, ret);
    return ret;
  },
};
