import io from "socket.io-client"
import { getDataLocal } from "../../helpers/localStorage";

const ENDPOINT = "https://api.vispace.tech";

const socket = io(ENDPOINT, {
    transports: ["websocket"],
    auth: (cb) => {
        cb({ accessToken: getDataLocal("access_token")})
    }
});

console.log(socket);

export default socket;