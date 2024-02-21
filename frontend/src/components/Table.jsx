// import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useState, useCallback } from "react";
const Table = () => {
  const [searchName, setSearchName] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  const filterData = useCallback(
    (books) => {
      console.log("filter");
      // if (!searchAuthor && !searchName) return books;
      // else {
      // const result = books.filter((book) => {
      //   if (
      //     book.name.startsWith(searchName) ||
      //     book.author.startsWith(searchAuthor)
      //   ) {
      //     console.log(book);
      //     return book;
      //   }
      const result = books.filter((book) => {
        const nameMatch = searchName
          ? book.name.toLowerCase().startsWith(searchName.toLowerCase())
          : true;
        const authorMatch = searchAuthor
          ? book.author.toLowerCase().startsWith(searchAuthor.toLowerCase())
          : true;
        if (nameMatch && authorMatch) {
          console.log(nameMatch, authorMatch);
          return book;
        }
      });

      console.log(result);
      return result;
      // }
    },
    [searchName, searchAuthor]
  );

  const { data: books } = useQuery({
    queryFn: async () => {
      const res = await axios.get("https://taskhosting.onrender.com/getBooks");

      //   console.log(res.data);
      return res.data;
    },
    retry: 2,
    select: filterData,
  });

  console.log(searchAuthor, searchName);

  return (
    <main className="h-screen flex bg-violet-400 p-10 justify-center">
      {books && (
        <div className="flex flex-col w-11/12 max-w-[750px]">
          <div className="w-full flex justify-between">
            <input
              className="p-2 rounded-md"
              type="text"
              placeholder="Search Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />

            <input
              className="p-2 rounded-md"
              type="text"
              placeholder="Search Author"
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full  justify-around p-2 bg-violet-600 rounded-md">
              <p>name</p>
              <p>description</p>
              <p>author</p>
            </div>
            {books.map((book) => {
              return (
                <div
                  key={book.id}
                  className="flex justify-around bg-violet-300 p-2"
                >
                  <p>{book.name}</p>
                  <p>{book.description}</p>
                  <p>{book.author}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};

export default Table;
