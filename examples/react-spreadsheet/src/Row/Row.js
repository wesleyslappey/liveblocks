import { useState, useEffect } from "react";
import styles from "./Row.module.css";
import Cell from "../Cell/Cell";

export default function Row({ row, columns, index }) {
  const [rowData, setRowData] = useState(row.toObject());

  useEffect(() => {
    function onChange() {
      setRowData(row.toObject());
    }

    row.subscribe(onChange);

    return () => row.unsubscribe(onChange);
  }, [row]);

  return (
    <div className={styles.container}>
      {columns.map((column, indexColumn) => {
        const columnData = column.toObject();
        return (
          <Cell
            key={indexColumn}
            value={rowData[columnData.key]}
            setValue={(value) => {
              row.set([columnData.key], value);
            }}
            width={columnData.width}
            cellId={`${indexColumn}:${index}`}
          />
        );
      })}
    </div>
  );
}
