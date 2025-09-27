import {db} from "../config/firebase.js";
const postRef = db.collection("posts");
export default postRef;