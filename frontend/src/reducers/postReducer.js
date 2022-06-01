import {ALL_POSTS_FAIL,ALL_POSTS_REQUEST,ALL_POSTS_SUCCESS,CLEAR_ERRORS} from '../constants/postConstant'

export const postReducer = (state = {posts: []},action)=>{
    switch (action.type) {
        case ALL_POSTS_REQUEST:
            return {
                loading: true,
                posts: []
            }
        case ALL_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.payload.posts,
                postsCount: action.payload.postsCount
            }
        case ALL_POSTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
