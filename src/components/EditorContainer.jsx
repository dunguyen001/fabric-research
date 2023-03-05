import { Layer, Rect, Stage } from "react-konva";
import { Rectangle } from "./Rectangle";

export const EditorContainer = ({
  stageWidth,
  stageHeight,
  rectangles,
  selectShape,
  selectedId,
  setRectangles,
  checkDeselect,
}) => {
  return (
    <div className="w-full h-full">
      <Stage
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        width={stageWidth}
        height={stageHeight}
        className="w-full"
      >
        <Layer>
          {rectangles.map((v, i) => {
            if (v.type === "rect") {
              return (
                <Rectangle
                  key={i}
                  shapeProps={v}
                  isSelected={v.id === selectedId}
                  onSelect={() => {
                    selectShape(v.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};
