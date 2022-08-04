import {useState} from "react";

const ProgressBar = ({progress}) => {

  const [progressAnimated, setProgressAnimated] = useState(0);

  setTimeout(() => setProgressAnimated(progress), 200);

  return (
      <>
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                     aria-label="Example with label" style={{width: `${progressAnimated}%`}}
                     aria-valuenow={progressAnimated} aria-valuemin="0" aria-valuemax="100">
                  {`${progressAnimated}%`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default ProgressBar;
