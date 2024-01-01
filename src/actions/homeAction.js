import axios from "axios";
export const FETCH_TAGS  = "fetch_tags";
export const FETCH_PROMOTION = "fetch_promotion"
export const FETCH_DETAIL = "fetch_detail"

export const fetchTags = () => {
    return dispatch => {
        axios({
            url: `https://api.extrazone.com/tags/list`,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Country-Id':'TR',
                'X-Language-Id':'TR'
            }
        }).then((result) => {
            dispatch({
                type: FETCH_TAGS,
                payload: result.data
            })
        }).catch((err) => {
             console.log("err", err)
        })
    }
}
export const fetchPromotion = () => {
    return dispatch => {
        axios({
            url: `https://api.extrazone.com/promotions/list?Channel=PWA`,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Country-Id':'TR',
                'X-Language-Id':'TR'
            }
        }).then((result) => {
            dispatch({
                type: FETCH_PROMOTION,
                payload: result.data
            })
        }).catch((err) => {
             console.log("err", err)
        })
    }
}
export const fetchDetail = (id) => {
    return dispatch => {
        axios({
            url: `https://api.extrazone.com/promotions?Id=${id}`,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Country-Id':'TR',
                'X-Language-Id':'TR'
            }
        }).then((result) => {
            dispatch({
                type: FETCH_DETAIL,
                payload: result.data
            })
        }).catch((err) => {
             console.log("err", err)
        })
    }
}

