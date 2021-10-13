import { useList } from "@liveblocks/react";
import styles from "./Content.module.css";
import Row from "./Row";
import Column from "./Column";
import { LiveObject } from "@liveblocks/client";

export default function Content() {
  const columns = useList("columns");
  const rows = useList("rows");

  if (!rows || !columns) {
    return null;
  }

  return (
    <section className={styles.container}>
      <header className={styles.container_header}>
        <div className={styles.tools}>
          <button
            className={styles.button_add_row}
            onClick={() => {
              rows.push(
                new LiveObject({
                  name: "",
                  url: "",
                  description: "",
                })
              );
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 0H4V4H0V6H4V10H6V6H10V4H6V0Z"
                style={{ fill: "var(--teal)" }}
              />
            </svg>
            Add row
          </button>
        </div>
        <div className={styles.container_header_columns}>
          {columns.map((column, index) => {
            return <Column key={index} column={column} />;
          })}
        </div>
      </header>
      <div className={styles.container_rows}>
        {rows.map((row, index) => {
          return (
            <Row
              key={index}
              row={row}
              columns={columns}
              index={index}
              isLastRow={index === rows.length - 1}
            />
          );
        })}
      </div>
    </section>
  );
}
