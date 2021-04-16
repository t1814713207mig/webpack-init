
const reducer = {
    user: (state = null, { type, payload }) => {
        switch (type){
            case 'user/login':
                return {
                    ...state,
                    ...payload,
                };
            case 'user/logout':
                return null;
            default:
                return state;
        }
    }
}
export default reducer;