import db, { storage } from "@/firebase/init.js";


export const getAll = async function(collection) {
  const snapshot = await db.collection(collection).get()
  return snapshot.docs.map(doc => Object.assign({ id: doc.id }, doc.data()));
}

export const getById = async function(collection, id) {
  const snapshot = await db.collection(collection).doc(id).get();
  return snapshot.data()
}

export function updateById(collection, id, object) {
  db.collection(collection).doc(id).set(object);
}

export const addNew = async function(collection, object) {
      const docRef = await db.collection(collection).add(object);
      console.log(docRef.id);
    return docRef.id;
}

export const uploadFile = async function(file) {
  var storageRef = storage.ref();
  var fileRef = storageRef.child('images/' + new Date().getTime() + file.name);
  let snapshot = await fileRef.put(file);
  return await snapshot.ref.getDownloadURL();
}

export const deleteById = async function(collection, id) {
  const snapshot = await db.collection(collection).doc(id).delete();
  return snapshot.data()
}

export const pushMember = async function(id) {
    let members;
    let temp = await db.collection("Squads").doc(id).get();
    members = temp.data();
    members.Members.push(localStorage.getItem("id"));
    db.collection('Squads').doc(id).set(members);
}
