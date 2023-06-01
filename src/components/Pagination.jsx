import React from 'react'

const Pagination = ({arrayPages,currentPage,setCurrentPage,quantityPages}) => {

    const prevPage = () => {
        if (currentPage - 1 === 0) {
            setCurrentPage(quantityPages)
        }else{
            setCurrentPage(currentPage - 1)
        }
    }
    const nextPage = () => {
        if(currentPage + 1 > quantityPages) {
          setCurrentPage(1)
        } else {
          setCurrentPage(currentPage + 1)
        }
      }

    const changePageTo =  num => setCurrentPage(num)
        
  return (
    <div className='pagination-container'>
        <div onClick={prevPage} className='pag-prev-next'>&#60;</div>
        <ul className='pagination-number-container'>
            {
                arrayPages?.map(num => (
                    <li onClick={() => changePageTo(num)} className={currentPage === num ? `page-number page-active` : 'page-number'} key={num}>{num}</li>
                ))
            }
        </ul>
        <div onClick={nextPage} className='pag-prev-next'>&#62;</div>
    </div>
  )
}

export default Pagination