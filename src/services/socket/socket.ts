import io from "socket.io-client"
import { getDataLocal } from "../../helpers/localStorage";

const ENDPOINT = "127.0.0.1:8000";

const socket = io(ENDPOINT, {
    auth: (cb) => {
        cb({ accessToken: getDataLocal("access_token")})
    }
});

export default socket;