import { createSlice, configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';


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

const cartInitialValue = {
  cartLength: 0,
  cartData: {}
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialValue,
  reducers: {
    addItem(state, action) {
      state.cartData = {
        ...state.cartData,
      }
      // checking if the item is already added, if it is, just increase the counter
      let isNew = true;
      Object.keys(state.cartData).forEach(key => {
        if (key === String(action.payload.id)) {
          isNew = false;
        }
      });
      if (isNew) {
        state.cartData[action.payload.id] = {count: 1, name: action.payload.name, price: action.payload.price, img: action.payload.img}
      } else {
        state.cartData[action.payload.id] = {count: state.cartData[action.payload.id]['count'] + 1, name: action.payload.name, price: action.payload.price, img: action.payload.img}
      }
      state.cartLength = Object.keys(state.cartData).length;
    },
    removeItem(state, action) {
      state.cartData = { ...state.cartData };
      const id = action.payload.id;
      if (state.cartData[id]) {
        if (state.cartData[id].count !== 1) {
          state.cartData[id].count -= 1;
        } else {
          delete state.cartData[id];
        }
      }
      state.cartLength = Object.keys(state.cartData).length;
    },
    removeAllItems(state, action) {
      state.cartData = { ...state.cartData };
      delete state.cartData[action.payload.id];
      state.cartLength = Object.keys(state.cartData).length;
    },
    emptyCart(state) {
      state.Lenght = 0;
      state.cartData = {};
    }
  }
});



const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer
  },
  middleware: getDefaultMiddleware({serializableCheck: false})
})



export const generalActions = generalSlice.actions;
export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;


export default store;