"use client";
import Index, { IndexProps } from "@/components/CRUD/Index";

type Props = Omit<
  IndexProps,
  "handleCreateItem" | "handleEditItem" | "handleDeleteItem" | "schema"
>;

const GamesIndex = ({ items, pageSize, currentPage, totalRows }: Props) => {
  console.log("✅", { items });

  const handleCreateItem = () => {
    // Logic to handle item creation, such as a database call
  };

  const handleEditItem = (id: number | string) => {
    // Logic to handle item editing
  };

  const handleDeleteItem = (id: number | string) => {
    // Logic to handle item deletion
  };

  const schema = [
    { header: "id", prop: "id" },
    { header: "date", prop: "date" },
    { header: "game #", prop: "number" },
    { header: "score", prop: "score" },
    { header: "# of frames", prop: "frames", length: true },
  ];

  return (
    <Index
      schema={schema}
      items={items}
      currentPage={currentPage}
      pageSize={pageSize}
      totalRows={totalRows}
      handleCreateItem={handleCreateItem}
      handleEditItem={handleEditItem}
      handleDeleteItem={handleDeleteItem}
    />
  );
};

export default GamesIndex;
