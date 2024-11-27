import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SignInState = {
  value: number;
}

const initialState: SignInState = {
  value: 0,
};

export const signInSlice = createSlice({
  name: 'sign_in',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setValue } = signInSlice.actions;
export default signInSlice.reducer;
