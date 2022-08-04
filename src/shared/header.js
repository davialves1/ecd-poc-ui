const Header = () => {

  return (
      <>
        <nav className="navbar navbar-expand-lg bg-light py-3 shadow mb-5">
          <div className="container-fluid ms-5">
            <a className="navbar-brand me-5" href="/">ECD:POC</a>
            <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse float-end w-100"
                 id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/upload">Select a File</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/meta-data">Meta Data</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/read-file">Read File</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/read-file">Edit File</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
  )
}

export default Header;
