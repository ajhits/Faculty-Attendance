import { database } from "./Configuration"
import { 
    ref,  
    onValue, 
    remove,
    set,
    update
    // push
} from "firebase/database";

// GET HISTORY TODAY
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

  // GET HISTORY
  export const getHistory = async () => {
    return new Promise((resolve, reject) => {
      try {
        const dbRef = ref(database, `History/`);
        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
  
          // Convert object into an array of key-value pairs
          const dataArray = Object.entries(data);
  
          // Sort the array based on date (in descending order)
          dataArray.sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));
  
          // Convert the sorted array back into an object
          const sortedData = {};
          dataArray.forEach(([date, value]) => {
            sortedData[date] = value;
          });
  
          resolve(sortedData);
        }, (error) => {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

// GET EMPLOYEE
export const getEmployee = async () => {
  return new Promise((resolve, reject) => {
    try {
      
      const dbRef = ref(database, `Account`);
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

// CREATE EMPLOYEE
export const createEmployee = async (props) => {

  return new Promise((resolve, reject) => {
    try {
      set(ref(database, 'Account/' + String(props.id)),props.data);
      resolve("okay")
    } catch (err) {
      console.error(err);
      reject(err)
    }
  })

}

// GET USER DATA
export const getUserData = async (uid) => {
  return new Promise((resolve, reject) => {
    try {
      
      const dbRef = ref(database, `Account/${uid}`);
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

// REMOVE USER
export const removeUser = (ID) => {
  return new Promise((resolve, reject) => {

      const keyRef = ref(database, `Account/${ID}`);
      remove(keyRef)
          .then(() => {
              console.log(ID);
              console.log(`Key "${ID}" removed successfully.`);
              resolve(`Key "${ID}" removed successfully.`);
          })
          .catch((error) => {
              console.error(`Error removing key "${ID}":`, error);
              reject(error);
          });
  });
};

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



export const updateUserData = async (props) => {
  return new Promise((resolve, reject) => {
    try {
      update(ref(database, `Account/${props.UID}`), {
        "email": props.email,
        "idNumber": props.idNumber,
        "name": props.name,
        "position": props.position
      })
      .then(() => resolve("Data updated successfully"))
      .catch(error => reject(error));
    } catch (err) {
      reject(err);
    }
  });
}
