import {ListBox} from "primereact/listbox";
import {useState} from "react";
import {InputText} from "primereact/inputtext";

const WorksheetsList = () => {

  const [worksheet, setWorksheet] = useState('Worksheet 01');

  const [query, setQuery] = useState('');

  const worksheets = [
      'Worksheet 01',
      'Worksheet 02',
      'Charts 2008',
      'Worksheet 01 Copy',
      'Worksheet 03',
      'Worksheet 04',
      'Charts 2020',
      'Final Comparison',
      'USA California',
  ]

  return (
      <div className="h-auto w-100 my-5 rounded-2">
        <h5>Worksheets</h5>
        <span className="p-input-icon-left w-100 my-2">
            <i className="pi pi-search" />
            <InputText value={query}
                       className="w-100"
                       onChange={(e) => setQuery(e.target.value)}
                       placeholder="Search" />
        </span>
        <ListBox className="w-100" value={worksheet} options={worksheets} onChange={(e) => setWorksheet(e.value)}/>
      </div>
  );
};

export default WorksheetsList;
