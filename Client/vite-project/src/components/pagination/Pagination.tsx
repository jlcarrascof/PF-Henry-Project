import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

interface FilteredRooms {
  filteredRooms: any[];
}

const Pagination: React.FC<FilteredRooms> = ({ filteredRooms }) => {
  const [currentRooms, setCurrentRooms] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [roomsOffSet, setRoomsOffSet] = useState(0);
  const roomsPerPage = 5;

  useEffect(() => {
    if (filteredRooms) {
      const endOffset = roomsOffSet + roomsPerPage;
      setCurrentRooms(filteredRooms.slice(roomsOffSet, endOffset));
      setPageCount(Math.ceil(filteredRooms.length / roomsPerPage));
    }
  }, [filteredRooms, roomsOffSet, roomsPerPage]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = selectedItem.selected * roomsPerPage;
    setRoomsOffSet(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="prev"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
