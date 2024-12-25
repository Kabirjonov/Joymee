import React, { useState, useEffect } from 'react'
import Heading from '../../common/Heading'
import RecentCard from './RecentCard'
import './recent.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Search from '../Hero/Search';
import Search1 from './Search'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

export default function Recent() {
  const [houses, setHouses] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const getData = async (page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${page}`)
      setHouses(response.data.houses)
      setTotalPages(response.data.totalPage)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  useEffect(() => {
    getData(page)
  }, [])
  const handleChangPage = (e, value) => {
    setPage(value)
  }

  const handleSearch = async (data) => {
    console.log(data)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search/${page}`, {
        params: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        setHouses(response.data.houses)
        setTotalPages(response.data.totalPage)
        console.log(houses)
        const house = houses[0]
        console.log(house)
        // const items = house.
    }
    catch (err) {
      setHouses([])
        setPage(0)
        setTotalPages(0)
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="recent padding">
        <div className="container">
          <Heading title="Recent Property Listed" SpecialClass="w-100 text-center" size="w-75 m-auto" subtitle="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam."/>
          <div className="mb-5">
          </div>
          <Search onSearch={handleSearch} />
          {/* <Search1/> */}
          <RecentCard houses={houses} />
          {houses.length > 0 && page > 0 && (
            <Stack spacing={2}>
              <Pagination count={totalPages} page={page} onChange={handleChangPage} shape="rounded" className='m-auto shadow-none bg-transparent' />
            </Stack>
          )}

        </div>
      </div>

    </>
  )
}
