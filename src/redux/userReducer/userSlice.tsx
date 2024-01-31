import { createSlice } from '@reduxjs/toolkit';
import { JwtPayload } from '../../globals/dtos/jwtPayload.dto';

const initialState = {
    user: {
        id: null,
        email: null,
        fullName: null,
        role: null,
        address: null,
        isLogin: false
    }
}

export const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.info
        },
        clearUser: (state) => {
            state.user = {
                id: null,
                email: null,
                fullName: null,
                role: null,
                address: null,
                isLogin: false
            }
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: any) => state.userAuth.user;
export default userSlice.reducer;