// import { firestore, database } from 'firebase';
import fire from '../../firebaseConfig/config';

  function FetchFollowers() {
  let arr = [];

  return new Promise(async function (resolve,reject){
    let followers = fire.firestore().collection('followers');
    let snapshot = await followers.get();
    snapshot.forEach(doc => {
      const data = doc.data();
      arr.push(data);
      console.log(arr);
    })
    resolve(arr)
  })
}
export default {FetchFollowers}