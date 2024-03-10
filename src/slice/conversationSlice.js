import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        isAuthenticated: false,
        loading: false
    },
    reducers: {
        fetchChatRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        fetchChatSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                messages: action.payload,
            }
        },
        fetchChatFail(state, action) {
            console.error("Error fetching chat messages:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        sendChatRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        sendChatSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                messages: action.payload,
            }
        },
        sendChatFail(state, action) {
            console.error("Error fetching chat messages:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        // getLatestChatRequest(state, action) {
        //     return {
        //         ...state,
        //         loading: true,
        //     }
        // },
        // getLatestChatSuccess(state, action) {
        //     return {
        //         ...state,
        //         loading: false,
        //         isAuthenticated: true,
        //         messages: action.payload,
        //     }
        // },
        // getLatestChatFail(state, action) {
        //     console.error("Error fetching chat messages:", action.payload);
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //     }
        // },
    }
});

const { actions, reducer } = conversationSlice;

export const {
    fetchChatRequest,
    fetchChatFail,
    fetchChatSuccess,
    getLatestChatFail,
    getLatestChatRequest,
    getLatestChatSuccess,
    sendChatRequest,
    sendChatFail,
    sendChatSuccess
} = actions;

export default reducer;
