import { firestore } from "../../firebase/firebase.utils";
import { renderDate } from "../../utils/utils";

// DELETE USER

export const onDeleteApprovedUser = async (id, name) => {
  if (window.confirm(`Deseja DELETAR o cadastro de ${name}`)) {
    await firestore.collection("users").doc(id).delete();
  }
};

// DELETE PENDING USER
export const onDeletePendingUser = async (id, name) => {
  if (window.confirm(`Deseja DELETAR o pré-cadastro de ${name}`)) {
    await firestore.collection("pendingUsers").doc(id).delete();
  }
};

// APPROVE PENDING USER
export const approvePendingUser = async (id, name) => {
  if (window.confirm(`Deseja APROVAR o pré-cadastro de ${name}`)) {
    // 1. get user datas from firestore "pendingUsers" collection
    const userDatas = await firestore.collection("pendingUsers").doc(id).get();

    // 2. save user datas on firestore "users" collection
    await firestore
      .collection("users")
      .doc(id)
      .set({ ...userDatas.data() });

    // 3. delete user datas from firestore "pendingUsers" collection
    await firestore.collection("pendingUsers").doc(id).delete();
  }
};

// CREATE NEW ARRAY TO PRINT USERS' TABLE
export const usersDisplay = (array) => {
  const newArray = [];

  array.forEach((user, index) => {
    let userObj = {};
    Object.keys(array[0]).forEach((key) => {
      let value = "";
      switch (user[key].type) {
        case "checkbox":
          if (user[key].checked) value = "Sim";
          else if (user[key].checked === false) value = "Não";
          else value = "";
          break;
        case "radio":
        case "select-one":
          value = user[key].label ? user[key].label : user[key].value;
          break;
        case "date":
          value = renderDate(user[key].value); // convert datas from db to displayable data to render on users table
          break;
        case "text":
          if (key === "street") {
            value = renderAdress(key, user);
          } else {
            value = user[key].value;
          }
          break;
        default:
          value = user[key].value;
      }

      userObj = { ...userObj, [key]: value };
    });
    newArray[index] = { ...userObj, id: user.id };
  });

  return newArray;
};

// ---------------------------------------- UTILS ----------------------------------------

const renderAdress = (key, user) => {
  return `${user[key].value}${user["number"].value ? ", " : ""}${
    user["number"].value
  } ${user["complement"].value ? " - " : ""}${user["complement"].value}`;
};
