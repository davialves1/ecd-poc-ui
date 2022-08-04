const ProgressBar = ({progress}) => {

  return (
      <>
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                     aria-label="Example with label" style={{width: `${progress}%`}}
                     aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                  {`${progress}%`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default ProgressBar;
