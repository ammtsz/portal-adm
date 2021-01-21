import { firestore } from "../../firebase/firebase.utils";


// EDIT INTERNAL NOTES
// allows the textarea content to be modified
export const editInternalNotes = (id) => {
  document.querySelector(`#internalNote--${id} > textarea`).disabled = false;
};



// SUBMIT INTERNAL NOTES
// when clicked on save button, the note will be saved on firestore
export const submitInternalNotes = async (id, internalNote, isApprovedTab) => {
  
  // alternates the firestore db collection depending on which tab we are
  const collection = isApprovedTab ? "users" : "pendingUsers"
  
  // prevents the textarea content to be modified
  document.querySelector(`#internalNote--${id} > textarea`).disabled = true;

  // save the note on firestore
  const userDatas = await firestore.doc(`${collection}/${id}`).get();
  await firestore
    .doc(`${collection}/${id}`)
    .update({
      ...userDatas.data(),
      internalNotes: {
        ...userDatas.data()["internalNotes"],
        value: internalNote,
      },
    });
};
