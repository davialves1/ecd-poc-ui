import EntityMapper from "./entity-mapper";

const CustomHeader = ({params, height}) => {
  const column = params.columnGroup.children[0].colId;
  const increaseHeight = () => {
    if (height < 220) {
      height += 47;
    }
    params.api.setGroupHeaderHeight(height);
  }

  const mapper = <EntityMapper column={column} increaseHeight={increaseHeight}/>;

  return column === 'id' ? <></> : mapper;
};

export default CustomHeader;
