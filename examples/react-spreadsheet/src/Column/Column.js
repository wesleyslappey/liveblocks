import { useState, useEffect } from "react";
import styles from "./Column.module.css";

export default function Column({ column }) {
  const [columnData, setColumnData] = useState(column.toObject());

  useEffect(() => {
    function onChange() {
      setColumnData(column.toObject());
    }

    column.subscribe(onChange);

    return () => column.unsubscribe(onChange);
  }, [column]);

  return (
    <div className={styles.container} style={{ width: columnData.width }}>
      {columnData.value}
    </div>
  );
}
