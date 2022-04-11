import io from "socket.io-client"

const ENDPOINT = "https://api.vispace.tech";

const socket = io(ENDPOINT, {
    transports: ["websocket"],
    auth: (cb) => {
        cb({ accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpYXQiOjE2NDk1ODA5OTgsImV4cCI6MTY1MTIzMjM3OTA5NSwiaXNzIjoidmlydHVhbHNwYWNlLmNvbSJ9.hSjqpgQ2Qdv0Bect4HHL39Ixncld9ggZ3IZj26ESPyo"})
    }
});

console.log(socket);

export default socket;