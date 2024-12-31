import React,{useState} from 'react';

const Search = ({onSearch,loading}) => {
  const [location,setLocation]=useState('')
  const [type,setType]=useState('');
  const [price,setPrive]=useState('')
  const handleSubmit = (e)=>{
    e.preventDefault()
    const searchData = {location,type,price}
    onSearch(searchData)
    setLocation('')
    setPrive('')
    setType('')
  }
  return (
    <form onSubmit={handleSubmit} className='shadow p-3 bg-body rounded form-inline'>
      <div className='row d-flex align-self-stretch form-group'>
        <div className='col-lg-3 col-md-4 col-md-6 d-grid align-items-center form-group'>
          <span className="mb-1">City/Street</span>
          <input className='form-control' type='text' placeholder='Location' value={location} onChange={(e)=>setLocation(e.target.value)}/>
        </div>
        <div className='col-lg-3 col-md-4 col-md-6 d-grid align-items-center form-group'>
          <span className="mb-1">Type</span>
          <select
            name="type"
            value={type}
            className="form-control"
            onChange={(e)=>setType(e.target.value)}
          >
            <option defaultChecked>Change</option>
            <option value="sell">Sotuv</option>
            <option value="rent">Arenda</option>
          </select>
        </div>
        <div className='col-lg-3 col-md-4 col-md-6 d-grid align-items-center form-group'>
          <span className="mb-1">Price Range</span>
          <input className='form-control' type='number' placeholder='Price Range' value={price} onChange={(e)=>setPrive(e.target.value)}/>
        </div>
        <div className='col-lg-3 col-md-4 col-md-6 d-flex justify-content-evenly align-items-center form-group'>
          <h5 className='h5'>Advance Filter</h5>
          <button type='submit' className='btn btn-warning' disabled={loading}>{loading?'...':<i className='bi bi-search'></i>}</button>
        </div>
      </div>
    </form>
  );
}

export default Search;
