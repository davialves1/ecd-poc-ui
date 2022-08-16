import {useState} from "react";
import {CascadeSelect} from "primereact/cascadeselect";

const EntityMapper = ({column, inputCount, params}) => {

  const [value, setValue] = useState();

  const entities = [
    {
      entity: 'Engine',
      properties: [
        {name: 'RPM Max'},
        {name: 'Power PS'},
        {name: 'Code'},
        {name: 'Power HP'}
      ]
    },
    {
      entity: 'Transmission',
      properties: [
        {name: 'Validation Date'},
        {name: 'Position'},
        {name: 'Drive Type'},
        {name: 'Remarks'}
      ]
    },
    {
      entity: 'Brand',
      properties: [
        {name: 'Name'},
        {name: 'Short Name'}
      ]
    },
  ]

  const onChange = (selected) => {
    setValue(selected.value);
    console.log(column, selected.value);
  }

  const mappings = [...Array(inputCount).keys()];

  return (<>
    {mappings.map((i) => {
      return <CascadeSelect
          className="w-100 me-2"
          key={i}
          onChange={onChange}
          placeholder="Select"
          value={value}
          optionLabel={"name"}
          optionGroupLabel={"entity"}
          optionGroupChildren={['properties']}
          options={entities} />
    })}
    </>)
}

export default EntityMapper;
