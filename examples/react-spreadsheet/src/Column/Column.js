import { useState, useEffect } from "react";
import { COLUMN_WIDTH_MAX, COLUMN_WIDTH_MIN } from "../constants";
import { clamp } from "../utils";
import styles from "./Column.module.css";

export default function Column({ column }) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeValuesStart, setResizeValuesStart] = useState(null);
  const [columnData, setColumnData] = useState(column.toObject());

  useEffect(() => {
    function onChange() {
      setColumnData(column.toObject());
    }

    column.subscribe(onChange);

    return () => column.unsubscribe(onChange);
  }, [column]);

  useEffect(() => {
    function onPointerMove(e) {
      if (!isResizing || !resizeValuesStart) {
        return;
      }

      const newWidth = clamp(
        resizeValuesStart.width + (e.clientX - resizeValuesStart.x),
        COLUMN_WIDTH_MIN,
        COLUMN_WIDTH_MAX
      );
      column.set("width", newWidth);
    }

    function onPointerUp() {
      setIsResizing(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isResizing, resizeValuesStart, column]);

  return (
    <div className={styles.container} style={{ width: columnData.width }}>
      {columnData.value}

      <button
        className={styles.resize_handle}
        onPointerDown={(e) => {
          setIsResizing(true);
          setResizeValuesStart({
            x: e.clientX,
            width: columnData.width,
          });
        }}
      >
        <div className={styles.resize_line} />
      </button>
    </div>
  );
}
