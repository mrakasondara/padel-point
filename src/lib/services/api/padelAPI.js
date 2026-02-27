const baseAPI = process.env.NEXT_PUBLIC_BASE_API;
class PadelApi {
  static async register(userData) {
    try {
      const response = await fetch(`${baseAPI}/register`, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default PadelApi;
