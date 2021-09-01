import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_BOOKS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const books = data?.books || [];

  return (
    <main>
      <div className="flex-row justify-center">
        {books &&
          books.map((book) => (
            <div key={book._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {book.title} <br />
                </h4>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Home;
