import { createSlice } from "@reduxjs/toolkit";

const astroSlice = createSlice({
    name: 'astro',
    initialState: {
        loading: false,
        isAuthenticated: false
    },
    reducers: {
        loginRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                astrologer: action.payload.astrologer,
                // token:action.payload.token
            }
        },
        loginFail(state, action) {
            console.log("Error in login:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },


        logoutSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: false
            }
        },

        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload

            }
        }
    }

});

const { actions, reducer } = astroSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
  
    logoutSuccess,
    logoutFail
} = actions;
export default reducer