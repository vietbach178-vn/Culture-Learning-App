import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MobileContainer from "./components/layout/MobileContainer";
import BottomNav from "./components/layout/BottomNav";
import HomeB from "./pages/HomeB";
import LibraryPage from "./pages/LibraryPage";
import ContentDetailPage from "./pages/ContentDetailPage";
import PlayerPage from "./pages/PlayerPage";
import VocabularyPage from "./pages/VocabularyPage";
import PracticeHubPage from "./pages/PracticeHubPage";
import PracticePage from "./pages/PracticePage";
import CulturePage from "./pages/CulturePage";
import CultureDetailPage from "./pages/CultureDetailPage";
import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";
import LyricsPage from "./pages/LyricsPage";
import PassportPage from "./pages/PassportPage";

function AppContent() {
  const location = useLocation();
  const hideNav =
    location.pathname.startsWith("/player/") ||
    location.pathname.startsWith("/practice/") ||
    location.pathname.startsWith("/lyrics/") ||
    (location.pathname.startsWith("/chat/") && location.pathname !== "/chat");

  return (
    <MobileContainer>
      <Routes>
        <Route path="/" element={<HomeB />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/:id" element={<ContentDetailPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/practice" element={<PracticeHubPage />} />
        <Route path="/practice/:id" element={<PracticePage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="/culture/:id" element={<CultureDetailPage />} />
        <Route path="/chat" element={<ChatListPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/lyrics/:id" element={<LyricsPage />} />
        <Route path="/passport" element={<PassportPage />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </MobileContainer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
