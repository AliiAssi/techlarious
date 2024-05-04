import "./pagination.css";

const Pagination = ({pages,setCurrentPage,currentPage}) => {
  // const POST_PER_PAGE = 3;
  const generatedPages = [];
  for(let i = 1;i<=pages ; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="pagination">
      <div className="page previous" onClick={()=>{
        if(currentPage > 1) currentPage -= 1;
        setCurrentPage(currentPage);
      }}>Previous</div>
      {generatedPages.map((page) => (
        <div className={currentPage === page ? "page active" : "page"} key={page} onClick={()=>{setCurrentPage(page)}}>
          {page}
        </div>
      ))}
      <div className="page next" onClick={
        ()=>{
          if(currentPage < pages){
            currentPage += 1
          }
          setCurrentPage(currentPage);
        }
      }>Next</div>
    </div>
  );
};

export default Pagination;
