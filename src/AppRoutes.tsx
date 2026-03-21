import React, { JSX } from "react";
import { Route, Routes } from "react-router";
import NotFound from "~/NotFound";
import ClaimPage from "~/pages/ClaimPage";
import DiscoverPage from "~/pages/DiscoverPage";
import FollowingPage from "~/pages/FollowingPage";
import HelpPage from "~/pages/HelpPage";
import HomePage from "~/pages/HomePage";
import LibraryPage from "~/pages/LibraryPage";
import ListsPage from "~/pages/ListsPage";
import PreferencesPage from "~/pages/PreferencesPage";
import SearchPage from "~/pages/SearchPage";
import SettingsPage from "~/pages/SettingsPage";
import TagsPage from "~/pages/TagsPage";
import WalletPage from "~/pages/WalletPage";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route index path="/following" element={<FollowingPage />} />
      <Route index path="/tags" element={<TagsPage />} />
      <Route index path="/discover" element={<DiscoverPage />} />
      <Route index path="/library" element={<LibraryPage />} />
      <Route index path="/lists" element={<ListsPage />} />

      <Route path="/claim/*" element={<ClaimPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/preferences" element={<PreferencesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/help" element={<HelpPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
