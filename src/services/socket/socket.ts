import io from "socket.io-client"

const ENDPOINT = "https://api.vispace.tech";

const socket = io(ENDPOINT, {
    transports: ["websocket"],
    auth: (cb) => {
        cb({ accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0Nzk2NDUzOCwiZXhwIjoxNjQ5NjE0MzAzMjE5LCJpc3MiOiJ2aXJ0dWFsc3BhY2UuY29tIn0.yUbP4r6d46LcOq-AXUYqOyGhmjEKdLSegj4SzbagbeA"})
    }
});

console.log(socket);

export default socket;