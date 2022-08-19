const CustomTooltip = (params) => {
  const column = params.colDef.field;
  if (params.data.errors[column]) {
    return (
        <p className="shadow" style={{width: 200, height: 100, borderRadius: 10, padding: 20, backgroundColor: 'white'}}>
          <span style={{fontWeight: 'bold', color: 'indianred'}}>Error:</span> {params.data.errors[column]}
        </p>)
  } else {
    return <p className="shadow"
              style={{display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
                alignContent: 'center',
                textAlign: 'center',
                width: 100,
                height: 50,
                borderRadius: 10,
                padding: 20,
                backgroundColor: 'white'}}>
      {params.data[column]}</p>
  };
}

export default CustomTooltip;
