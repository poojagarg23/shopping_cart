import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState();
  const [iteamsfilter, setiteamsfilter] = useState();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setState(json);
        setiteamsfilter(json);
      });
  }, []);
  //   console.log(search, "ssss");
  function handleChange(e) {
    const Searchtext = e.target.value.toLowerCase();
    setSearch(Searchtext);
    // setiteamsfilter(Searchtext);
    console.log(iteamsfilter, "filter");
    console.log(Searchtext, "state");
    // if (search === "") {
    //   return state;
    // }

    const filtertable = iteamsfilter;
    console.log(filtertable, "filtertable");

    const filteredData = iteamsfilter?.filter((item) => {
      return (
        item.name.toLowerCase().includes(Searchtext) ||
        item.email.toLowerCase().includes(Searchtext) ||
        item.address.street.toLowerCase().includes(Searchtext) ||
        item.address.suite.toLowerCase().includes(Searchtext) ||
        item.address.city.toLowerCase().includes(Searchtext) ||
        item.address.zipcode.toLowerCase().includes(Searchtext)
      );
    });
    console.log(state, "filter");
    setState(filteredData);
  }
  function handleClick(id) {
    const update = state.filter((item) => item.id != id);
    setState(update);
  }
  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        placeholder="type to search"
      />
      <AiOutlineSearch className="search-icon" />

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">address</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        {state?.map((item) => {
          return (
            <tbody>
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {item.address.street},{item.address.suite},{item.address.city}
                  ,{item.address.zipcode}
                </td>
                <button className="button" onClick={() => handleClick(item.id)}>
                  <AiFillDelete />
                </button>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Search;
