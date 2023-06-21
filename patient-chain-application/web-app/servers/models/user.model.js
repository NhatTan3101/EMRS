import { database } from "../databases/firebase.database.js";

export default class UserModel {
  constructor() {
    this.ref = database.ref("users");
  }

  async findUser(userId) {
    /** Get all users from firebase */
    const data = await this.ref.child(userId).once("value");
    
    const users = data.val();

    return users;
  }

  async findUsers(keyword) {
    /** Get all users from firebase */
    const data = await this.ref.once("value");

    const users = data.val();

    const searchedUsers = [];

    for (const key in users) {
      const user = users[key];
      if (user?.mabhyt?.includes(keyword)) {
        
      console.log('user', user ,keyword)
        searchedUsers.push({...user, userId: key });
      }
    }

    return searchedUsers;
  }
}