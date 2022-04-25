import SearchBar from "./SearchBar"
export const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container' style={{width: '90%'}}>
            <div className='row'>
              <div className='col-md-12  intro-text'>
                <h1 >
                  {props.data ? props.data.title : 'Loading'}
                </h1>
                <SearchBar />
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
