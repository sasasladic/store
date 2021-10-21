import { createSlice, configureStore } from '@reduxjs/toolkit'



const initialValue = {
  isMobile: false
}
const generalSlice = createSlice({
  name: 'general',
  initialState: initialValue,
  reducers: {
    changeIsMobile(state) {
      state.isMobile = !state.isMobile;
    }
  }
});


const authInitialValue = {
  isLoggedIn: false,
  user: {}
}
const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialValue,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
    }
  }
});

// const authInitialValue = {
//   isLoggedIn: false,
//   isAdmin: false
// }
// const authSlice = createSlice({
//   name: 'authentication',
//   initialState: authInitialValue,
//   reducers: {
//     toggleLogIn(state) {
//       state.isLoggedIn = !state.isLoggedIn;
//     },
//     toggleAdmin(state) {
//       state.isAdmin = !state.isAdmin;
//     }
//   }
// });



const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    auth: authSlice.reducer
  }
})

export const generalActions = generalSlice.actions;
export const authActions = authSlice.actions;
// export const authenticationActions = authSlice.actions;

export default store;