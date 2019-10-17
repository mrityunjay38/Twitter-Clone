import db from './db'

export default function getAllTweetOfSingleUser (username) {
    
        const tweetArr = [];
        const tweetRefs = db.collection('tweets').orderBy('time', 'desc');
        const tweetDoc = tweetRefs.get().then( snap => {
            // console.log(snap.docs);
            snap.docs.forEach( doc => {
                // console.log(doc.data())
                tweetArr.push(doc.data())
                });
          });

        //   console.log(tweetArr);
          return tweetArr;
}