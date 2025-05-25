// src/App.tsx
//import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Text } from '@aws-amplify/ui-react';

import DashboardLayout from './layout/DashboardLayout';
import ChatPage from './pages/ChatPage';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import SignOutPage from './pages/SignOutPage';

import { Auth } from './components/authenticator/Auth1';

const App = () => {
  return (
   <Auth>
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          {/* ✅ This handles the root URL "/" */}
          <Route index element={<ChatPage />} />

          {/* Top nav */}
          <Route path="/nav1" element={<ChatPage />} />
          <Route path="/nav2" element={<Page2 />} />
          <Route path="/nav3" element={<Page3 />} />
          <Route path="/nav4" element={<Page4 />} />
          <Route path="/signout" element={<SignOutPage />} />


          {/* Sidebar routes */}
          <Route path="/section1/sub1" element={<ChatPage />} />
          <Route path="/section1/sub2" element={<Page2 />} />
          <Route path="/section2/sub1" element={<Page3 />} />
          <Route path="/section2/sub2" element={<ChatPage />} />
          <Route path="/section3/sub1" element={<Page2 />} />
          <Route path="/section3/sub2" element={<Page3 />} />

          {/* Fallback route for unknown paths */}
          <Route path="*" element={<Text color="red">404 - Page Not Found</Text>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Auth>
  );
};

export default App;
