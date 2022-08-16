import {useState} from "react";
import {CascadeSelect} from "primereact/cascadeselect";
import {Button} from "primereact/button";

const EntityMapper = ({column, params}) => {

  const [value, setValue] = useState();

  const [height, setHeight] = useState(180);

  const [inputCount, setInputCount] = useState(1);

  const entities = [
    {
      entity: 'Engine',
      properties: [
        {name: 'RPM Max', entity: 'Engine'},
        {name: 'Power PS', entity: 'Engine'},
        {name: 'Code', entity: 'Engine'},
        {name: 'Power HP', entity: 'Engine'}
      ]
    },
    {
      entity: 'Transmission',
      properties: [
        {name: 'Validation Date', entity: 'Transmission'},
        {name: 'Position', entity: 'Transmission'},
        {name: 'Drive Type', entity: 'Transmission'},
        {name: 'Remarks', entity: 'Transmission'}
      ]
    },
    {
      entity: 'Brand',
      properties: [
        {name: 'Name', entity: 'Brand'},
        {name: 'Short Name', entity: 'Brand'}
      ]
    },
  ]

  const onChange = (i, selected) => {
    setValue(selected.value);
    const DTO = {
      column,
      mapping: {
        entity: selected.value.entity,
        property: selected.value.name
      }
    }
    console.log(DTO);
  }

  const addMap = () => {
    params.api.setGroupHeaderHeight(height);
    setHeight((prevState => (prevState + 50)))
    setInputCount((prevState => (prevState + 1)))
  }

  const mappings = [...Array(inputCount).keys()];

  return (
      <div className="w-100 me-2 align-self-start d-flex flex-column">
        {mappings.map((i) => {
          return(
                <CascadeSelect
                    className={i === 0 ? "mt-3" : "mt-2"}
                    key={i}
                    onChange={(e) => onChange(i, e)}
                    placeholder="Select"
                    value={value}
                    optionLabel={"name"}
                    optionGroupLabel={"entity"}
                    optionGroupChildren={['properties']}
                    options={entities} />
            )
          })
        }
        <Button onClick={addMap} label="Add +" className="mt-2 p-button-outlined" />
      </div>
    )
}

export default EntityMapper;
