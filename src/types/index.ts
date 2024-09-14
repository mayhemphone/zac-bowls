export type IndexProps = {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  items: { [key: string]: any }[]; // this needs to be dynamic? or does it?
  handleCreateItem?: () => void;
  handleEditItem: (id: number | string) => void;
  handleDeleteItem: (id: number | string) => void;
  schema: {
    header: string;
    prop: string;
    length?: boolean;
    object?: boolean;
  }[];
};
