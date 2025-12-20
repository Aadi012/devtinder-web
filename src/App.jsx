import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

// Layout
import Body from "./components/Body";

// Pages
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import UserPublicProfile from "./components/UserPublicProfile";

import Homepage from "./components/Homepage";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Term";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>

          {/* MAIN APP LAYOUT */}
          <Route path="/" element={<Body />}>

            {/* PUBLIC ROUTES */}
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Login initialMode="signup" />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<Terms />} />

            {/* PROTECTED ROUTES */}
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />

            {/* ✅ PUBLIC USER PROFILE */}
            <Route path="user/:id" element={<UserPublicProfile />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
