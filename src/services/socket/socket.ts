import io from "socket.io-client"
import { getDataLocal } from "../../helpers/localStorage";

const ENDPOINT : string = process.env.REACT_APP_BASE_SOCKET_URL as string;

// const socket = io(ENDPOINT, {
//     auth: (cb) => {
//         cb({ accessToken: getDataLocal("access_token")})
//     }
// });

const socket = 'a'

export default socket;