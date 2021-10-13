import styles from "./App.module.css";
import Header from "../Header/Header";
import Content from "../Content/Content";
import { RoomProvider } from "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";

function App() {
  return (
    <RoomProvider
      id="spreadsheet-companies-yo"
      defaultPresence={() => ({
        name: "Anonymous",
        editingCell: null,
        selectedCell: null,
      })}
      defaultStorageRoot={{
        columns: new LiveList([
          new LiveObject({
            key: "name",
            value: "Name",
            width: 200,
          }),
          new LiveObject({
            key: "url",
            value: "Website",
            width: 300,
          }),
          new LiveObject({
            key: "description",
            value: "Description",
            width: 1000,
          }),
        ]),
        rows: new LiveList([
          new LiveObject({
            name: "Clover",
            url: "https://cloverapp.co",
            description:
              "Notes, whiteboarding, todos, and a daily planner in one simple tool.",
          }),
          new LiveObject({
            name: "Motionbox",
            url: "https://motionbox.io",
            description:
              "Motionbox exists to help creators and teams make better videos, faster.",
          }),
          new LiveObject({
            name: "Sprout",
            url: "https://sprout.place",
            description:
              "Create a virtual space to meet, chat, and play with your favorite people.",
          }),
        ]),
      }}
    >
      <div className={styles.container}>
        <Header />
        <Content />
      </div>
    </RoomProvider>
  );
}

export default App;
