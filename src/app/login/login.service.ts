import axios from "axios";
import { baseUrl } from "@/constants/dbUrl";

export interface iLogin {
  email: string;
  password: string;
  token?: string;
}

export const handleLogin = async (data: iLogin) => {
  // handle login action with axios
  try {
    const response = await axios.post(
      `${baseUrl}/api/user/login`,
      data, // email and password from req.body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`, // token from headers
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in Login", error);
    throw new Error("Failed to log in");
  }
};
