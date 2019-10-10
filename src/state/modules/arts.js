import { mergeState } from '@utils/store-utils';
import { camelizeKeys } from 'humps';
import { propOr } from 'ramda';
import axios from 'axios';
import * as qs from 'qs';

const INIT_ARTS = 'INIT_ARTS';
const SET_ARTS = 'SET_ARTS';
const APPEND_ARTS = 'APPEND_ARTS';
const CLEAR_CURRENT = 'CLEAR_CURRENT';
const SET_CURRENT = 'SET_CURRENT';
const SET_UPLOADING = 'SET_UPLOADING';
const CLEAR_UPLOADING = 'CLEAR_UPLOADING';
const SET_FEATURED_ART = 'SET_FEATURED_ART';
const CLEAR_FEATURED_ART = 'CLEAR_FEATURED_ART';

const defaultData = () => ({
  arts: [],
  currentPage: 0,
  currentArt: {},
  uploading: false,
  featuredArt: null,
});

export const state = defaultData();

export const getters = {};

export const mutations = {
  [INIT_ARTS]: (state) => {
    mergeState(state, defaultData());
  },
  [SET_ARTS]: (state, newArts) => {
    state.arts = newArts;
    state.currentPage = 0;
  },
  [APPEND_ARTS]: (state, newArts) => {
    state.arts = state.arts.concat(newArts);
    if (newArts.length > 0) state.currentPage++;
  },
  [CLEAR_CURRENT]: (state) => {
    state.currentArt = null;
  },
  [SET_CURRENT]: (state, art) => {
    state.currentArt = art;
  },
  [SET_UPLOADING]: (state) => {
    state.uploading = true;
  },
  [CLEAR_UPLOADING]: (state) => {
    state.uploading = false;
  },
  [SET_FEATURED_ART]: (state, art) => {
    state.featuredArt = art || null;
  },
  [CLEAR_FEATURED_ART]: (state) => {
    state.featuredArt = null;
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
      const { file, ...data } = payload;
      const uploadForm = new FormData();
      uploadForm.append('file', file);
      const uploadRes = await axios.post('/api/arts/upload', uploadForm);

      const createForm = new FormData();
      const fileUrl = uploadRes.data.file;
      createForm.append('file', fileUrl);
      for (let key in data) {
        createForm.append(key, data[key]);
      }
      const createRes = await axios.post(
        '/api/arts',
        qs.stringify({ ...data, file: fileUrl }, { arrayFormat: 'brackets' })
      );

      commit(CLEAR_UPLOADING);
      return createRes.data;
    } catch (err) {
      commit(CLEAR_UPLOADING);
      console.error(err);
    }
  },

  async getFeatureArts({ commit }) {
    const params = {
      sortBy: 'created_at',
      sortOrder: 'desc',
      page: 0,
      pageSize: 1,
    };
    const res = await axios.get('/api/arts', { params });
    commit(SET_FEATURED_ART, res.data[0]);
    return res;
  },
};
