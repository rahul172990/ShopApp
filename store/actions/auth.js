export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';

export const signup = (email,password) => {
    return async dispatch => {

       const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPfuNRb4i4hrjRQlKnBqo56JLUHGNJv1s',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true

            })
        }
        );

       const resData = await response.json();
       console.log(resData);
        dispatch({
            type:SIGNUP,
            token:resData.idToken,
            userId:resData.localId
        });
    };
};



export const signin = (email,password) => {
    return async dispatch => {

       const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPfuNRb4i4hrjRQlKnBqo56JLUHGNJv1s',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true

            })
        }
        );

       const resData = await response.json();
       console.log(resData);
        dispatch({
            type:SIGNIN,
            token:resData.idToken,
            userId:resData.localId
        });
    };
};

