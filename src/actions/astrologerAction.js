import {
    loginRequest,
    loginFail,
    loginSuccess,
    clearError,
    logoutFail,
    logoutSuccess
} from '../slice/astrologerSlice'
import axios from 'axios'

export const login = (mobileNo,token) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response= await axios.get(`${process.env.REACT_APP_URL}/api/v1/astrologer/phoneNo?mobilePrimary=${mobileNo}`,config);
    

        dispatch(loginSuccess(response.data))
        return response.data
    } catch (error) {
        dispatch(loginFail(error?.response?.data?.message))
    console.log(error?.response?.data?.message);
    }

}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}



export const logout =  async (dispatch) => {

    try {
        const {data} = await axios.get(`${process.env.REACT_APP_URL}/api/v1/admin/logout`)
        dispatch(logoutSuccess(data))
    } catch (error) {
        dispatch(logoutFail())
    }

}