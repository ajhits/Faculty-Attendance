import { 
  doc, 
  setDoc, 
  getDoc,
  updateDoc, 
  deleteDoc, 
  addDoc, 
  collection, 
  getDocs  
} from "firebase/firestore";
import { firestore } from './Configuration'
import { LogoutSession } from "./Auth/Authentication";

// create collection
export const createUserData = async (UID,name,email,cc) =>{

  // Add a new document in collection "users"
  await setDoc(doc(firestore, "users", UID), {
    user: name,
    email: email,
    contactNumber: cc,
    bookID: "N/A",
    price: "N/A",
    paymentStatus: "N/A",
    paymentHistory: "N/A",
    startDate: "N/A"
  })
  .then(test=>{
    console.log(test);
    window.location.reload();
  })
  .catch(err=>console.log(err));
  

}

// Book user collection
export const bookUser = async (data) => {
  return new Promise(async (resolve, reject) => {
      try {
          // Add a new document in collection "booking"
          const docRef = await addDoc(collection(firestore, "booking"), data);
          alert("Booking Complete");
          resolve(docRef); // Resolve with the reference to the newly created document
      } catch (error) {
          if (error.code === "invalid-argument") {
              reject(new Error("Please input necessary field or select room first"));
          } else {
              reject(error);
          }
      }
  });
};

  
// checkout booking
export const checkoutBooking = (props) => {
  return new Promise(async (resolve, reject) => {
    await updateDoc(doc(firestore, "booking", props.UID), {
      status: props.status
    })
      .then(() => {
        // alert("Successfully checked out");
        resolve("succcess");
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

// Function to retrieve all data in the "booking" collection
export const getAllBookings = () => {
  return new Promise(async (resolve, reject) => {
    const bookingCollectionRef = collection(firestore, 'booking');

    try {
      // Fetch all documents in the "booking" collection
      const querySnapshot = await getDocs(bookingCollectionRef);

      // Initialize an array to store the retrieved data
      const bookings = [];

      // Iterate through each document snapshot
      querySnapshot.forEach(doc => {
        // Extract the document data and push it to the array
        bookings.push({ id: doc.id,
          // totalPrice: parseInt(doc.totalPrice) + parseInt(doc.addsOnPrice), 
          ...doc.data() });
      });

      // Resolve with the array of bookings
      resolve(bookings);
    } catch (error) {
      console.error('Error getting documents: ', error);
      reject(error);
    }
  });
};

// Function to retrieve all data in the "booking" collection
export const getAllReservations = () => {
  return new Promise(async (resolve, reject) => {
    const bookingCollectionRef = collection(firestore, 'pending');

    try {
      // Fetch all documents in the "booking" collection
      const querySnapshot = await getDocs(bookingCollectionRef);

      // Initialize an array to store the retrieved data
      const bookings = [];

      // Iterate through each document snapshot
      querySnapshot.forEach(doc => {
        // Extract the document data and push it to the array
        bookings.push({ id: doc.id,
          // totalPrice: parseInt(doc.totalPrice) + parseInt(doc.addsOnPrice), 
          ...doc.data() });
      });

      // Resolve with the array of bookings
      resolve(bookings);
    } catch (error) {
      console.error('Error getting documents: ', error);
      reject(error);
    }
  });
};



// Verify Admin
export const isAdmin = (UID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(firestore, "Account", UID); // Assuming firestore is properly defined elsewhere

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();



        resolve(data.admin); // Resolve with the user data
      } else {
        console.log("User document does not exist!");
        resolve(null); // Resolve with null if user document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      reject(error); // Reject the promise with the error
    }
  });
};

// Function to retrieve all data in the "booking" collection
export const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    const bookingCollectionRef = collection(firestore, 'Account');

    try {
      // Fetch all documents in the "booking" collection
      const querySnapshot = await getDocs(bookingCollectionRef);

      // Initialize an array to store the retrieved data
      const user = [];

      // Iterate through each document snapshot
      querySnapshot.forEach(doc => {
        // Extract the document data and push it to the array
        user.push({ id: doc.id, ...doc.data() });
      });

      // Resolve with the array of bookings
      resolve(user);
    } catch (error) {
      console.error('Error getting documents: ', error);
      reject(error);
    }
  });
};

export const createUserAccount = async (UID,data) =>{

  // Add a new document in collection "users"
  await setDoc(doc(firestore, "Account", UID),data)
  .then(test=>{
    alert("Account succesfully created please login again");
    LogoutSession()
  })
  .catch(err=>console.log(err));
  

}

// get user name
export const getUserName = async (UID) =>{
  try {
    const docRef = doc(firestore, "users", UID); // Assuming firestore is properly defined elsewhere

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      console.log("getUserName",data.user);

      return data.user; // You can return the data or do whatever you want with it
    } else {
      console.log("User document does not exist!");
      return null; // Or handle the non-existence case accordingly
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error or handle it gracefully
  }
}

// update a username
export const updateBooking = async (props) =>{
    await updateDoc(doc(firestore, "users", props.UID), {
      bookID: props.bookID,
      paymentHistory: props.paymentHistory,
      paymentStatus: props.paymentStatus,
      paymentDetails: props.paymentDetails,
      price: props.price,
      startDate: props.startDate,
      endDate: props.endDate
    })
    .then(test=>{
      alert("You have been book");
      window.location.reload();
    })
    .catch(err=>console.log(err));
}

// update a details
export const updateDetails = async (props) =>{

    await updateDoc(doc(firestore, "booking", props.UID),props.data)
    .then(test=>{
      alert("Details Updated");
      window.location.reload();
    })
    .catch(err=>console.log(err));
  

}

// get userDetails
export const getUserDetails = (UID) =>{

  return new Promise(async (resolve,reject)=>{


  try {
    const docRef = doc(firestore, "Account", UID); // Assuming firestore is properly defined elsewhere

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      resolve(data); // You can return the data or do whatever you want with it
    } else {
      console.log("User document does not exist!");
      reject(null); // Or handle the non-existence case accordingly
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    reject(error); // Rethrow the error or handle it gracefully
  }
})
}

// update Locker Number
export const updateLocker = async (UID=null, LockerNumber=null) =>{

  if (LockerNumber === null){
    return 
  }

  await updateDoc(doc(firestore, "users", UID), {
    LockerNumber: LockerNumber
  })
    .then(test=>{
      alert("Your locker has been updated! Please set a new PIN code.");
      window.location.reload();
    })
    .catch(err=>console.log(err));


}

// update a username
export const promoteAdmin = async (UID,Name) =>{

  await updateDoc(doc(firestore, "users", UID), {
    isAdmin: true
  })
  .then(test=>{
    alert(`${Name} is promoted as Admin`);
    window.location.reload();
  })
  .catch(err=>console.log(err));
}

// update a username
export const setUserStatus = async (UID,status) =>{

  await updateDoc(doc(firestore, "users", UID), {
    isActive: status,
    LockerNumber: null
  })
  .then(()=>{
    console.log("User Updated")
    window.location.reload()
  })
  .catch(err=>console.log(err));
}

// delete User
export const deleteUser =  (UID) =>{

  return new Promise(async (resolve, reject) => {
    try{

      const userDoc = doc(firestore, "users", UID);
      await deleteDoc(userDoc);  
     
      resolve("Successful remove")
  
    }catch(e){

      reject("Error removing")
    }
  })

}