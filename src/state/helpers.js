import { mapState, mapGetters, mapActions } from 'vuex';

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
};

export const authMethods = mapActions('auth', ['logIn', 'logOut']);

export const artsComputed = {
  ...mapState('arts', {
    arts: (state) => state.arts,
    currentPage: (state) => state.page,
    currentArt: (state) => state.current,
    uploading: (state) => state.uploading,
  }),
};

export const artsMethods = mapActions('arts', ['searchArts', 'uploadArt']);
