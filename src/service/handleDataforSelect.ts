import { ColumnFilterItem } from "antd/es/table/interface";

interface typeData {
  value: string;
  label: string;
}
const handleDataforSelect = {
  collumnName: (lockupDataSource: any) => {
    if (lockupDataSource) {
      const filtersType: typeData[] = [];
      const filtersMaterial: typeData[] = [];
      const filtersBrand: typeData[] = [];
      const filtersDesign: typeData[] = [];
      const filtersColor: typeData[] = [];
      lockupDataSource.brand.forEach((element: any) => {
        filtersBrand.push({
          value: element.name,
          label: element.name,
        });
      });
      lockupDataSource.type.forEach((element: any) => {
        filtersType.push({
          value: element.name,
          label: element.name,
        });
      });
      lockupDataSource.material.forEach((element: any) => {
        filtersMaterial.push({
          value: element.name,
          label: element.name,
        });
      });
      lockupDataSource.design.forEach((element: any) => {
        filtersDesign.push({
          value: element.name,
          label: element.name,
        });
      });
      lockupDataSource.color.forEach((element: any) => {
        filtersColor.push({
          value: element.name,
          label: element.name,
        });
      });
      return {
        type: filtersType,
        design: filtersDesign,
        material: filtersMaterial,
        brand: filtersBrand,
        color: filtersColor,
      };
    }
    return { type: [], design: [], material: [], brand: [], color: [] };
  },
};
export default handleDataforSelect;
