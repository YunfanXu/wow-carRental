import SearchBar from "./SearchBar";

export const Header = ({ data, searchData, handleSearchData }) => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container' style={{ width: '90%' }}>
            <div className='row'>
              <div className='col-md-12  intro-text'>
                <h1 >
                  {data ? data.title : 'Loading'}
                </h1>
                <SearchBar searchData={searchData} handleSearchData={handleSearchData} />
                {/* <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Learn More
                </a>{' '} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
