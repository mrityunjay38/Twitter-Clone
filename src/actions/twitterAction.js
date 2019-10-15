export const signUp = (newUser) => {
    return ( dispatch, getState, {getFirebase,getFirestore}) => {
       
        const firestore = getFirestore();
        firestore.collection('newUser').add({
            
        })
        dispatch({type: 'singnup',newUser})
    }
}
