import type { Metadata } from "next";
import SearchResults from "./SearchClient";

export const metadata: Metadata = {
  title: "Search Results | Newstrendey",
  description: "Browse news articles matching your search query on Newstrendey.",
};

export default function SearchPage() {
  return <SearchResults />;
}
