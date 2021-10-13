import { useState, useEffect } from "react";
import styles from "./Row.module.css";
import Cell from "../Cell/Cell";

export default function Row({ row, columns, index, isLastRow }) {
  const [rowData, setRowData] = useState(row.toObject());
  const [columnsData, setColumnsData] = useState(columns.toArray());

  useEffect(() => {
    function onChange() {
      setRowData(row.toObject());
    }

    row.subscribe(onChange);

    return () => row.unsubscribe(onChange);
  }, [row]);

  useEffect(() => {
    function onChange() {
      setColumnsData(columns.toArray());
    }

    columns.subscribeDeep(onChange);

    return () => columns.unsubscribeDeep(onChange);
  }, [columns]);

  return (
    <div className={styles.container}>
      {columnsData.map((column, indexColumn) => {
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
            isLastRight={indexColumn === columns.length - 1}
            isLastBottom={isLastRow}
          />
        );
      })}
    </div>
  );
}
