import {useState, useContext} from "react";
import DataContext from "./data-context";

const ProgressBar = ({progressNumber}) => {

  const {progress} = useContext(DataContext);

  const [progressAnimated, setProgressAnimated] = useState(progress ? progress : 0);

  setTimeout(() => setProgressAnimated(progressNumber), 200);

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
