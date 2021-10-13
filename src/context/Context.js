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
    general: generalSlice.reducer
  }
})

export const generalActions = generalSlice.actions;
// export const authenticationActions = authSlice.actions;

export default store;