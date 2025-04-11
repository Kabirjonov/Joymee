import { Pagination } from "react-bootstrap";
import { Head, Search, BlogCard } from "../";
import { Loader } from "../../../ui";
import { useSelector, useDispatch } from "react-redux";
import { fetchHouses } from "../../../helpers/fetchUserExtraRudex";
import { useEffect } from "react";
function Blog() {
  const { isLoading, totalPage, page } = useSelector((state) => state.house); // Redux-dan page va totalPage olish
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHouses({ page }));
  }, [dispatch, page]);
  const handlePageChange = async (newPage) => {
    dispatch(fetchHouses({ page: newPage }));
  };
  const pageItems = [];
  for (let i = 1; i <= totalPage; i++) {
    pageItems.push(
      <Pagination.Item
        key={i}
        active={i === page}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div className="container text-center py-5">
      <Head
        title="Recent Property Listed"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
      />
      <Search />
      {isLoading && <Loader />}
      <BlogCard />

      <div className="d-flex justify-content-center">
        <Pagination>{pageItems}</Pagination>
      </div>
    </div>
  );
}

export default Blog;
