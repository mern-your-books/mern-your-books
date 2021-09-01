import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_BOOKS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const books = data?.books || [];

  return (
    <main>
      <nav className="navbar">
        <img
          src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
          alt="book in front of mountain"
          style={{ width: 32, height: 32 }}
        />
      </nav>
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
