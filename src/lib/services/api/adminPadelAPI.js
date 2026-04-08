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
  static async addUser(userData) {
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
  static async addCourt(courtData) {
    try {
      const response = await fetch(`${baseAPI}/courts`, {
        method: "POST",
        body: courtData,
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
  static async getDetailCourt(id) {
    try {
      const response = await fetch(`${baseAPI}/courts/${id}`);
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

const bookedDates = [
  {
    date: "Sat Feb 28 2026 00:00:00 GMT+0700 (Western Indonesia Time)",
    times: [
      {
        time: "08-09",
        booked: true,
      },
      {
        time: "10-11",
        booked: true,
      },
      {
        time: "12-13",
        booked: true,
      },
      {
        time: "14-15",
        booked: true,
      },
      {
        time: "16-17",
        booked: true,
      },
    ],
  },
  {
    date: "Fri Feb 27 2026 00:00:00 GMT+0700 (Western Indonesia Time)",
    times: [
      {
        time: "08-09",
        booked: false,
      },
      {
        time: "10-11",
        booked: true,
      },
      {
        time: "12-13",
        booked: true,
      },
      {
        time: "14-15",
        booked: false,
      },
      {
        time: "16-17",
        booked: false,
      },
    ],
  },
];

export default adminPadelAPI;
