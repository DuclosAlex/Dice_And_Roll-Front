import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/interfaces/UserInterace/user.interface";

type userState = {
    user: User[];
}

const initialState = {
    user: []
} as userState;


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        logUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                user: state.user.concat(action.payload)
            }
        },
        resetUser: () => initialState,
    }
})

export const { logUser, resetUser} = userSlice.actions;
export default userSlice.reducer;