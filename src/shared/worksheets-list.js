import {ListBox} from "primereact/listbox";
import {useContext, useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import DataContext from "./data-context";


const initialWorksheets = [
  'Worksheet 01',
  'Worksheet 02',
  'Charts 2008',
  'Worksheet 01 Copy',
  'Worksheet 03',
  'Worksheet 04',
  'Charts 2020',
  'Final Comparison',
  'USA California',
];

const WorksheetsList = () => {

  const {selectedWorksheet, setSelectedWorksheet} = useContext(DataContext);

  const {worksheets, setWorksheets} = useContext(DataContext);

  const [worksheetList, setWorksheetList] = useState([]);

  const [query, setQuery] = useState('');

  const onSearch = (e) => {
    setQuery(e.target.value);
    let updatedWorksheets = initialWorksheets;
    if (query.length !== 0) {
      updatedWorksheets = initialWorksheets.filter((ws) => ws.toLowerCase().includes(query.toLowerCase()));
      if (updatedWorksheets.length === 0) updatedWorksheets = initialWorksheets;
    }
    setWorksheets(updatedWorksheets);
  }

  const onChangeWorksheet = (e) => {
    const selected = e.originalEvent.target.textContent;
    setSelectedWorksheet(selected);
  }

  useEffect(() => {
    if (worksheets) {
      setWorksheetList(Object.keys(worksheets));
    }
  }, [worksheets]);

  return (
      <div className="h-auto w-100 my-5 rounded-2">
        <h5>Worksheets</h5>
        <span className="p-input-icon-left w-100 my-2">
            <i className="pi pi-search" />
            <InputText value={query}
                       className="w-100"
                       onChange={onSearch}
                       onKeyUp={onSearch}
                       placeholder="Search" />
        </span>
        <ListBox className="w-100"
                 value={selectedWorksheet}
                 options={worksheetList}
                 onChange={(e) => onChangeWorksheet(e)}/>
      </div>
  );
};

export default WorksheetsList;
