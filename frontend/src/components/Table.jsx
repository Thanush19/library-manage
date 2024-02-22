// import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useState, useCallback } from "react";
import Pagination from "./Pagination";
const Table = () => {
  const [searchName, setSearchName] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

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
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentBooks = books?.slice(firstPostIndex, lastPostIndex);
  return (
    <main className="h-screen flex flex-col bg-black text-white p-10 justify-center items-center w-full overflow-y-scroll">
      <div className="w-full flex justify-between mb-5 max-w-[900px]">
        <input
          className="p-2 rounded-md"
          type="text"
          placeholder="Search Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <h1 className="text-xl">LIBRARY MANAGEMENT</h1>

        <input
          className="p-2 rounded-md"
          type="text"
          placeholder="Search Author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
      </div>
      {books && (
        // <table className="table-auto flex flex-col text-center  w-11/12 max-w-[750px]">
        //   <thead className="bg-violet-500 w-full h-auto">
        //     <tr
        //     // className="flex justify-around p-4"
        //     >
        //       <th className="">Name</th>
        //       <th>Description</th>
        //       <th>Author</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {/* <div className="flex w-full  justify-around p-2 bg-violet-600 rounded-md">
        //       <p>name</p>
        //       <p>description</p>
        //       <p>author</p>
        //     </div> */}
        //     {currentBooks.map((book) => {
        //       return (
        //         <tr
        //           key={book.id}
        //           // className="flex justify-around bg-violet-300 p-2"
        //         >
        //           <td className="border-2 border-slate-200">{book.name}</td>
        //           <td>{book.description}</td>
        //           <td>{book.author}</td>
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table>
        <table className="table-auto h-auto border-collapse w-full text-center p-2 max-w-[900px]">
          <thead className="bg-slate-800 w-full h-auto">
            <tr className="rounded-md">
              <th className="p-6">Name</th>
              <th>Description</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks &&
              currentBooks.map((d, i) => {
                return (
                  <tr
                    key={d.id}
                    className={
                      i % 2 == 0
                        ? "border-2 bg-slate-800"
                        : "border-2 bg-slate-900"
                    }
                  >
                    <td className="p-6 border-2 border-slate-100">{d.name}</td>
                    <td className="p-6 border-2 border-slate-100">
                      {d.description}
                    </td>

                    <td className="border-2 border-slate-100 p-6">
                      {d.author}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <Pagination
        totalPost={books?.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Table;
