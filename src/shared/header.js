const Header = () => {

  return (
      <>
        <nav className="navbar navbar-expand-lg py-4 shadow" style={{ backgroundColor: 'var(--primary-500)' }}>
          <div className="container-fluid ms-5">
            <a className="navbar-brand me-5 text-white" href="/" style={{fontSize: '1.4em'}}>
              <span className="fw-bolder">ECD</span> | Demo App
            </a>
            <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0 text-white w-100 d-flex justify-content-end me-5">
                <li className="nav-item">
                  <a className="nav-link text-white" href="/upload">Select a File</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/meta-data">Meta Data</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/read-file">Read File</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
  )
}

export default Header;
