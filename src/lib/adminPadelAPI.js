const baseAPI = process.env.NEXT_PUBLIC_BASE_API;
class adminPadelAPI {
  static async getUsers() {
    try {
      const response = await fetch(`${baseAPI}/users`);
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async addUsers(userData) {
    try {
      const response = await fetch(`${baseAPI}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateUserRole({ id, role }) {
    try {
      const response = await fetch(`${baseAPI}/users/${id}`, {
        method: "PUT",
        body: role,
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteUser(id) {
    try {
      const response = await fetch(`${baseAPI}/users/${id}`, {
        method: "DELETE",
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default adminPadelAPI;
