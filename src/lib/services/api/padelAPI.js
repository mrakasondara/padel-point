const baseAPI = process.env.NEXT_PUBLIC_BASE_API;
class PadelApi {
  // auth api
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

  // courts api
  static async getCourts(limit) {
    try {
      const response = await fetch(
        `${baseAPI}/courts${limit ? `?limit=${limit}` : ""}`
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getDetailCourt(id) {
    try {
      const response = await fetch(`${baseAPI}/courts/${id}`);
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getFavoriteCourts(limit) {
    try {
      const response = await fetch(
        `${baseAPI}/courts/favorites${limit ? `?limit=${limit}` : ""}`
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async addToFavorite({ id, court_name }) {
    try {
      const response = await fetch(`${baseAPI}/courts/${id}/favorite`, {
        method: "POST",
        body: JSON.stringify(court_name),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getBookedCourts(limit) {
    try {
      const response = await fetch(
        `${baseAPI}/courts/booked${limit ? `?limit=${limit}` : ""}`
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // comment court api
  static async getComments(id) {
    try {
      const response = await fetch(`${baseAPI}/courts/${id}/comments`);
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async addComment({ id, comment }) {
    try {
      const response = await fetch(`${baseAPI}/courts/${id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteComment({ courtId, commentId }) {
    try {
      const response = await fetch(
        `${baseAPI}/courts/${courtId}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async likeComment({ courtId, commentId }) {
    try {
      const response = await fetch(
        `${baseAPI}/courts/${courtId}/comments/${commentId}/like`,
        {
          method: "PUT",
        }
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async dislikeComment({ courtId, commentId }) {
    try {
      const response = await fetch(
        `${baseAPI}/courts/${courtId}/comments/${commentId}/dislike`,
        {
          method: "PUT",
        }
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // cart api
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
