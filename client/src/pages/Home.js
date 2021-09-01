import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_BOOKS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const books = data?.books || [];

  return (
    <main>
      <div className="flex-row justify-center">{books}</div>
    </main>
  );
};

export default Home;
