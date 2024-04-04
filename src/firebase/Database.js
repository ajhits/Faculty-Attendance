import { database } from "./Configuration"
import { 
    ref,  
    onValue, 
    remove,
    set,
    update
    // push
} from "firebase/database";

// GET HISTORY
export const getHistoryToday = async (date) => {
    return new Promise((resolve, reject) => {
      try {
        
        const dbRef = ref(database, `History/${date}`);
        onValue(dbRef, (snapshot) => 
          {
      
            const data = snapshot.val();
    

            resolve(data) 
          }, (error) => 
          {
            reject(error);
          });
  
      }catch(error){
        reject(error);
      }
    });
  }


//   OLD CODE
export const addNewRoom = async (props) => {
    try {
        set(ref(database, 'Room/' + props.id),props);
    } catch (err) {
        console.error(err);
    }
}

export const removeRoom = (ID) => {
    return new Promise((resolve, reject) => {

        const keyRef = ref(database, `Room/${ID}`);
        remove(keyRef)
            .then(() => {
                console.log(ID);
                console.log(`Key "${ID}" removed successfully.`);
                resolve();
            })
            .catch((error) => {
                console.error(`Error removing key "${ID}":`, error);
                reject(error);
            });
    });
};

export const updateRoom = async (props) => {
  return new Promise((resolve,reject)=>{
    
    try {

      update(ref(database, 'Room/' + props.id),props)
      .then(result=>resolve(result))
      .catch(error=>reject(error))

    } catch (err) {
      reject(err);
    }
  })

}