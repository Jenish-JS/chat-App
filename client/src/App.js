import Navigations from "./navigation/Navigations.js";
import SocketContext, {socket } from "./socket/socket.js";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Navigations />
    </SocketContext.Provider>
  );
}

export default App;
