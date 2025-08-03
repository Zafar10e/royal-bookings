export type Props = {
 page: number
 pages: number
 onPageChange: (page: number) => void
}

const Pagination = ({ page, pages, onPageChange }: Props) => {
 const pageNumbers = []
 for (let i = 1; i <= pages; i++) {
  pageNumbers.push(i)
 }

 return (
  <div className="flex justify-center">
   <ul className="flex gap-3">
    {pageNumbers.map((pageNumber) => (
     <li className={`px-2 py-1 border border-gray-400 rounded cursor-pointer hover:font-bold hover:border-gray-500 ${page === pageNumber ? 'bg-gray-200' : ''}`}
      onClick={() => onPageChange(pageNumber)}
     >
      {pageNumber}
     </li>
    ))}
   </ul>
  </div>
 )

}

export default Pagination