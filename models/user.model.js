import {db} from "../config/firebase.js";
const userRef = db.collection("users");
export default userRef;