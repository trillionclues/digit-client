import axios from "axios";
import { baseUrl } from "@/constants/dbUrl";

// export interface UserType {
//     firstname: string,
//     lastname: string,
//     email: string,
//     mobile: string,
//     password: string
// }

// // sign up slice
// export const SIgnUpSlice = async(
//     async (newUserData: UserType) => {
//       try {
//         const response = await axios.post(`${baseUrl}/api/user/register`, newUserData);
//         return response.data;
//         } catch (err) {
//           throw err;
//           }
//           }
//   )
