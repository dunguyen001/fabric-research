import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

function App() {
  const [ecbCanvas, setCanvas] = useState(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const containerWidth = canvasContainerRef.current?.offsetWidth || 500;
    const canvasWidth = 1024;
    const containerHeight = canvasContainerRef.current?.offsetHeight || 500;
    const canvasHeight = 1024;
    const scaleRatio = Math.min(
      containerWidth / canvasWidth,
      containerHeight / canvasHeight
    );
    const canvas = new fabric.Canvas("canvas-container", {
      width: canvasWidth,
      height: canvasHeight,
      enableRetinaScaling: true,
    });
    canvas.setDimensions({
      width: canvas.getWidth() * scaleRatio,
      height: canvas.getHeight() * scaleRatio,
    });
    canvas.setZoom(scaleRatio);

    const textObj = {
      width: 203.4895836230667,
      height: 203.4895836230667,
    };
    const text1 = new fabric.Text("Hello", {
      width: textObj.width,
      height: textObj.height,
      lineSpacing: 1,
      textAlign: "center",
      left: 507.9158266261907,
      top: 220.45822021319682,
      originX: "center",
      originY: "center",
    });

    const textObj2 = {
      width: 307.2,
      height: 307.2,
    };
    const text2 = new fabric.Text("World", {
      width: textObj2.width,
      height: textObj2.height,
      lineSpacing: 1,
      textAlign: "center",
      left: 507.8563311704011,
      top: 514.2474747474748,
      originX: "center",
      originY: "center",
    });

    canvas.add(text1, text2);
    // setCanvas(canvas.toJSON());
    console.log(canvas.toJSON());
    setCanvas(canvas);
  }, []);
  console.log(ecbCanvas);

  const download = () => {
    const a = document.createElement("a");
    var svgBlob = new Blob([ecbCanvas.toSVG()], {
      type: "image/svg+xml;charset=utf-8",
    });
    console.log(ecbCanvas.toSVG())
    var svgUrl = URL.createObjectURL(svgBlob);
    a.href = svgUrl;
    a.setAttribute("download", "data.svg");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto bg-red">
      <div className="py-5 px-5">
        <div className="flex">
          <div
            ref={canvasContainerRef}
            style={{ height: 500, width: 500 }}
            className="border boder-1 w-auto"
          >
            <canvas id="canvas-container"></canvas>
          </div>
          <div>
            <button onClick={() => download()}>Export svg</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
