import db from './db'

function getAllTweetOfSingleUser (username) {
    
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

async function getFollowerData(userId) {
  const followerIds = [];
  
  const followData = await db.collection('followers').where('follower_id', '==', userId).get();

  followData.docs.forEach(doc => followerIds.push(doc.data().userId));

  return followerIds;

}

export default {
  getFollowerData
}