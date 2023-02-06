import { ColumnFilterItem } from "antd/es/table/interface";

const handleDataforTable = {
  collumnName: (lockupDataSource: any) => {
    if (lockupDataSource) {
      const filtersType: ColumnFilterItem[] = [];
      const filtersMaterial: ColumnFilterItem[] = [];
      const filtersBrand: ColumnFilterItem[] = [];
      const filtersDesign: ColumnFilterItem[] = [];
      const filtersColor: ColumnFilterItem[] = [];
      lockupDataSource.brand.forEach((element: any) => {
        filtersBrand.push({
          text: element.name,
          value: element.name,
        });
      });
      lockupDataSource.type.forEach((element: any) => {
        filtersType.push({
          text: element.name,
          value: element.name,
        });
      });
      lockupDataSource.material.forEach((element: any) => {
        filtersMaterial.push({
          text: element.name,
          value: element.name,
        });
      });
      lockupDataSource.design.forEach((element: any) => {
        filtersDesign.push({
          text: element.name,
          value: element.name,
        });
      });
      lockupDataSource.color.forEach((element: any) => {
        filtersColor.push({
          text: element.name,
          value: element.name,
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
export default handleDataforTable;
