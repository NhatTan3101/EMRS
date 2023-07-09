import { database } from "../databases/firebase.database.js";

export default class UserModel {
  constructor() {
    this.ref = database.ref("users");
  }

  async hasExamined(userId) {
    const data = await this.ref.child(userId).child('medical_record').child('exams').once("value");
    return !!data.val();
  }

  async findUser(userId) {
    /** Get all users from firebase */
    const data = await this.ref.child(userId).once("value");
    
    const users = data.val();

    return users;
  }

  async findUserByEmail(email) {
    /** Get all users from firebase */
    const data = await this.ref.child(email).once("value");
    
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
      if (user?.mabhyt?.includes(keyword) || !keyword) {
        searchedUsers.push({...user, userId: key });
      }
    }

    return searchedUsers;
  }
}