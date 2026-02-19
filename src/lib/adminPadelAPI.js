const baseAPI = process.env.NEXT_PUBLIC_BASE_API;
class adminPadelAPI {
  static async getUsers() {
    try {
      const response = await fetch(`${baseAPI}/admins/users`);
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default adminPadelAPI;
