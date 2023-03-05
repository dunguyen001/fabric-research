import { useEffect, useRef, useState } from "react";
import "./App.css";
import { EditorContainer } from "./components/EditorContainer";
const layerData = [
  {
    type: "rect",
    x: 10,
    y: 10,
    fill: "red",
    width: 30,
    height: 30,
  },
];
function App() {
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // We cant set the h & w on Stage to 100% it only takes px values so we have to
  // find the parent container's w and h and then manually set those !
  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);
  return (
    <div className="container m-5">
      <div className="flex flex-row">
        <div
          id="editor"
          className="flex-1 border border-1 p-2"
          style={{ height: 500 }}
          ref={divRef}
        >
          <EditorContainer
            stageHeight={dimensions.height}
            stageWidth={dimensions.width}
            layers={layerData}
          />
        </div>
        <div id="toolbar" className="p-2" style={{ width: "20%" }}>
          <div>HelloWorld</div>
        </div>
      </div>
    </div>
  );
}

export default App;
