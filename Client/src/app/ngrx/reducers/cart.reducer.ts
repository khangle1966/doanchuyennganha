import { createReducer, on } from '@ngrx/store';
import { CartState } from '../states/cart.state';
import * as CartAction from '../actions/cart.actions';
import { Profile } from 'src/app/models/profile.model';

export const initualState: CartState = {
  cartList: [],
  courseList: [],
  total: 0,
  isBuyLoading: false,
  isBuySuccess: false,
  buyErrorMessage: '',
  profile: <Profile>{},
};

export const CartReducer = createReducer(
  initualState,
  on(CartAction.addCourseToCart, (state, action) => {
    console.log(action.type);
    const cartList = [...state.cartList, action.course];
    console.log(cartList);
    const total = state.total + action.course.price;
    let newState: CartState = {
      ...state,
      cartList,
      total,
    };
    return newState;
  }),

  on(CartAction.removeCourseFromCart, (state, action) => {
    console.log(action.type);
    let newState: CartState = {
      ...state,
      cartList: state.cartList.filter(
        (course) => course._id !== action.course._id
      ),
      total: state.total - action.course.price,
    };
    return newState;
  }),

  on(CartAction.clearAllCart, (state, action) => {
    console.log(action.type);
    const productList = state.courseList.map((course) => {
      return {
        ...course,
      };
    });
    return {
      ...state,
      productList,
      cartList: [],
      total: 0,
    };
  }),

  on(CartAction.buyCourse, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isBuyLoading: true,
      isBuySuccess: false,
      buyErrorMessage: '',
    };
  }),

  on(CartAction.buyCourseSuccess, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isBuyLoading: false,
      isBuySuccess: true,
      buyErrorMessage: '',
    };
  }),

  on(CartAction.buyCourseFailure, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isBuyLoading: false,
      isBuySuccess: false,
      buyErrorMessage: action.buyErrorMessage,
    };
  }),

  on(CartAction.buyCourse, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isBuyLoading: true,
      isBuySuccess: false,
      buyErrorMessage: '',
    };
  }),

  on(CartAction.buyCourseSuccess, (state, { type, profile }) => {
    console.log(type);
    return {
      ...state,
      isBuyLoading: false,
      isBuySuccess: true,
      buyErrorMessage: '',
      profile,
    };
  }),

  on(CartAction.buyCourseFailure, (state, { type, buyErrorMessage }) => {
    console.log(type);
    return {
      ...state,
      isBuyLoading: false,
      isBuySuccess: false,
      buyErrorMessage,
    };
  })
);
