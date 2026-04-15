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
  static async getCourts() {
    try {
      const response = await fetch(`${baseAPI}/courts`);
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async addToCart(court) {
    try {
      const response = await fetch(`${baseAPI}/cart`, {
        method: "PUT",
        body: JSON.stringify(court),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async checkOutCart(courts) {
    try {
      const response = await fetch(`${baseAPI}/cart`, {
        method: "POST",
        body: JSON.stringify(courts),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async resetCart(court) {
    try {
      const response = await fetch(`${baseAPI}/cart`, {
        method: "DELETE",
        body: JSON.stringify(court),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async removeCartItem(court) {
    try {
      const id = court[0].id;
      const response = await fetch(`${baseAPI}/cart/${id}`, {
        method: "DELETE",
        body: JSON.stringify(court),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default PadelApi;
