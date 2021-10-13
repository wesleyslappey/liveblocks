import { useOthers, useUpdateMyPresence } from "@liveblocks/react";
import { useState, useRef } from "react";
import { COLORS_PRESENCE } from "./constants";
import styles from "./Cell.module.css";

export default function Cell({
  value,
  setValue,
  width,
  cellId,
  isLastRight,
  isLastBottom,
}) {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();
  const button = useRef();
  const input = useRef();
  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  let classNameContainer = styles.container;

  if (isLastRight && !isLastBottom) {
    classNameContainer += ` ${styles.container_last_right}`;
  } else if (!isLastRight && isLastBottom) {
    classNameContainer += ` ${styles.container_last_bottom}`;
  } else if (isLastRight && isLastBottom) {
    classNameContainer += ` ${styles.container_last_right_and_bottom}`;
  }

  return (
    <div className={classNameContainer} style={{ width }}>
      <input
        ref={input}
        className={styles.input}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") {
            setIsEditing(false);
            updateMyPresence({ editingCell: null });
          }
        }}
        onBlur={() => {
          setIsEditing(false);
          updateMyPresence({ editingCell: null });
        }}
        disabled={!isEditing}
      />
      {!isEditing && (
        <button
          ref={button}
          className={isSelected ? styles.button_selected : styles.button}
          onDoubleClick={() => {
            setIsEditing(true);
            updateMyPresence({ editingCell: cellId });

            if (input.current) {
              input.current.disabled = false;
              input.current.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(true);
              updateMyPresence({ editingCell: cellId });

              if (input.current) {
                input.current.disabled = false;
                input.current.focus();
              }
            } else if (e.key === "Backspace") {
              setValue(" ");
            } else if (e.key === "Escape") {
              if (button.current) {
                button.current.blur();
              }
            }
          }}
          onFocus={() => {
            setIsSelected(true);
            updateMyPresence({ selectedCell: cellId });
          }}
          onBlur={() => {
            setIsSelected(false);
            updateMyPresence({ selectedCell: null });
          }}
        >
          {value}
        </button>
      )}
      {others &&
        others.map(({ connectionId, presence }) => {
          if (!connectionId || !presence) {
            return null;
          }

          if (
            presence.editingCell === cellId ||
            presence.selectedCell === cellId
          ) {
            const rgb = COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length];

            return (
              <div key={connectionId}>
                <div
                  className={styles.selection_presence}
                  style={{
                    boxShadow: `0 0 0 1px rgba(${rgb}, 1), 0 0 0 4px rgba(${rgb}, 0.12)`,
                  }}
                />

                {presence.name && (
                  <div
                    className={styles.selection_presence_name}
                    style={{
                      backgroundColor: `rgba(${rgb}, 0.12)`,
                      color: `rgba(${rgb}, 1)`,
                    }}
                  >
                    {presence.name}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
    </div>
  );
}
