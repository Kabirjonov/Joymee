import React from 'react';
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  return (
    <div>
      <form className='row my-5 '>
        <div className="col-lg-8 col-md-6 d-flex justify-content-end">
          <button className="btn btn-sm btn-dark">Barcha</button>
          <button className="btn btn-sm btn-outline-dark">Mashxur</button>
          <button className="btn btn-sm btn-outline-dark">Eng ko`p</button>
        </div>
        <div className="col-lg-4 col-md-6 d-flex form-group">
          <input type="text" class="form-control form-control-lg shadow" aria-describedby="emailHelp" placeholder="Search House" />
          <button className="btn btn-dark rounded-right shadow"><IoIosSearch /></button>
        </div>
      </form>
    </div>
  );
}

export default Search;
