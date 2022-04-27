import { fetchNotices } from './ActionCreators'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { INotice } from "../../models/INotice"

interface NoticeState {
    notices: INotice[]
    isLoading: boolean,
    error: string
}

const initialState: NoticeState = {
    notices: [],
    isLoading: false,
    error: ''
}

export const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        // noticesFetching(state) {
        //     state.isLoading = true
        // },
        // noticesFetchingSuccess(state, action: PayloadAction<INotice[]>) {
        //     state.isLoading = false
        //     state.error = ''
        //     state.notices = action.payload

        // },
        // noticesFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = false
        //     state.error = action.payload
        // },
    },
    extraReducers: {
        [fetchNotices.fulfilled.type]: (state, action: PayloadAction<INotice[]>) => {
            state.isLoading = false
            state.error = ''
            state.notices = action.payload

        },
        [fetchNotices.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchNotices.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },

    }
}
)

export default noticeSlice.reducer