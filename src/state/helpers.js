import { mapState, mapGetters, mapActions } from 'vuex';

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
};

export const authMethods = mapActions('auth', ['logIn', 'logOut']);

export const artsComputed = {
  ...mapState('arts', ['arts', 'currentPage']),
};

export const artsMethods = mapActions('arts', ['searchArts']);

export const artDetailComputed = {
  ...mapState('arts', ['currentArt']),
};

export const artSubmitComputed = {
  ...mapState('arts', ['uploading']),
};

export const artSubmitMethods = mapActions('arts', ['uploadArt']);

export const homeComputed = {
  ...mapState('arts', ['featuredArt']),
};
