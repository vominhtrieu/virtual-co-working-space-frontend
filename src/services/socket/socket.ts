import io from "socket.io-client"

const ENDPOINT = "https://api.vispace.tech";

const socket = io(ENDPOINT, {
    transports: ["websocket"],
    auth: (cb) => {
        cb({ accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0ODM5NDc2MywiZXhwIjoxNjUwMDQ0OTU4MDEwLCJpc3MiOiJ2aXJ0dWFsc3BhY2UuY29tIn0.n7oKfC8pAqJOKTusNVeAXwjjtXa8IAnZLcDKeit5Dzw"})
    }
});

console.log(socket);

export default socket;