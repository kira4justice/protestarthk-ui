import { mergeState } from '@utils/store-utils';
import { camelizeKeys } from 'humps';
import { propOr } from 'ramda';
import axios from 'axios';

const INIT_ARTS = 'INIT_ARTS';
const SET_ARTS = 'SET_ARTS';
const APPEND_ARTS = 'APPEND_ARTS';
const CLEAR_CURRENT = 'CLEAR_CURRENT';
const SET_CURRENT = 'SET_CURRENT';
const SET_UPLOADING = 'SET_UPLOADING';
const CLEAR_UPLOADING = 'CLEAR_UPLOADING';

const defaultData = () => ({
  arts: [],
  page: 0,
  current: {},
  uploading: false,
});

export const state = defaultData();

export const getters = {};

export const mutations = {
  [INIT_ARTS]: (state) => {
    mergeState(state, defaultData());
  },
  [SET_ARTS]: (state, newArts) => {
    state.arts = newArts;
    state.page = 0;
  },
  [APPEND_ARTS]: (state, newArts) => {
    state.arts = state.arts.concat(newArts);
    if (newArts.length > 0) state.page++;
  },
  [CLEAR_CURRENT]: (state) => {
    state.current = null;
  },
  [SET_CURRENT]: (state, art) => {
    state.current = art;
  },
  [SET_UPLOADING]: (state) => {
    state.uploading = true;
  },
  [CLEAR_UPLOADING]: (state) => {
    state.uploading = false;
  },
};

export const actions = {
  init({ commit }) {
    commit(INIT_ARTS);
  },
  async searchArts({ commit, state }, payload) {
    const { query, tag } = payload;
    const page = propOr(state.page, 'page')(payload);
    let tags = tag || [];
    tags = tags instanceof Array ? tags : [tags];

    const params = { tags, query, page };
    const res = await axios.get('/api/arts', { params });
    const ret = camelizeKeys(res.data);

    if (page === 0) {
      commit(SET_ARTS, ret);
    } else {
      commit(APPEND_ARTS, ret);
    }
    return ret;
  },

  async fetchArtDetails({ commit }, id) {
    commit(CLEAR_CURRENT);

    const res = await axios.get(`/api/arts/${id}`);
    const ret = camelizeKeys(res.data);

    commit(SET_CURRENT, ret);
    return ret;
  },

  async uploadArt({ commit }, payload) {
    commit(SET_UPLOADING);

    try {
      const data = new FormData();
      for (let key in payload) {
        data.append(key, payload[key]);
      }
      const res = await axios.post('/api/arts', data);

      commit(CLEAR_UPLOADING);
      return res.data;
    } catch (err) {
      commit(CLEAR_UPLOADING);
      console.error(err);
    }
  },
};
