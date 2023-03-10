import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { TEMPLATE_1, TEMPLATE_2 } from "./const/template";
import { loadImageFromUrl } from "./utils/util";

const DEMO_TEMPLATE = TEMPLATE_2;

const baseUrl = "https://cdn.customily.com";
const imageMapping = {
  1: "/product-images/219f9106-81a5-435f-b199-56d16113db4d-219f9106-81a5-435f-b199-56d16113db4d.png",
  10: "/product-images/2f1c2861-a17b-4381-88ce-f1869767fe10-2f1c2861-a17b-4381-88ce-f1869767fe10.png",
  12: "/product-images/0a99883e-648d-44fb-9d62-e367dea8cbf5-0a99883e-648d-44fb-9d62-e367dea8cbf5.png",
  6: "/product-images/8ae5893f-ba5a-4581-ad0c-48d8094807c6-8ae5893f-ba5a-4581-ad0c-48d8094807c6.png",
  4: "/product-images/2fa932de-0b9a-4846-a439-6a51bb625ca3-2fa932de-0b9a-4846-a439-6a51bb625ca3.png",
};

function App() {
  const canvasContainerRef = useRef(null);

  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const { eps } = TEMPLATE_2;

    const containerWidth = canvasContainerRef.current?.offsetWidth || 500;
    const canvasWidth = eps.width;
    const containerHeight = canvasContainerRef.current?.offsetHeight || 500;
    const canvasHeight = eps.height;
    const scaleRatio = Math.min(
      containerWidth / canvasWidth,
      containerHeight / canvasHeight
    );
    const canvas = new fabric.Canvas("canvas-container", {
      width: canvasWidth,
      height: canvasHeight,
      enableRetinaScaling: true,
    });

    
    canvas.enableRetinaScaling = true;
    canvas.setHeight(canvasHeight);
    canvas.setWidth(canvasWidth);
    canvas.setDimensions({
      width: canvas.getWidth() * scaleRatio,
      height: canvas.getHeight() * scaleRatio,
    });
    canvas.setZoom(scaleRatio);

    const { imagePlaceHoldersEps } = eps;
    loadEPSImages(imagePlaceHoldersEps).then((imageObjects) => {
      setObjects(objects.concat(...imageObjects));
    });
    loadEPSImages(imagePlaceHoldersEps).then((imageObjects) => {
      setObjects(objects.concat(...imageObjects));
    });
    window._canvas = canvas
    return () => {
      canvas.dispose()
    };
  }, []);

  const loadImage = async (url) => {
    const bgBlob = await fetch(url).then((v) => v.blob());
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(bgBlob);
      reader.onloadend = function () {
        var base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  const loadEPSImages = async (epsImages = []) => {
    const imageObjects = await Promise.all(
      epsImages.map(async (imageObj) => {
        // test mode
        if (!imageMapping[imageObj.id]) return;

        const base64 = await loadImage(
          `${baseUrl}${imageMapping[imageObj.id]}`
        );

        const object = await new Promise((resolve, reject) => {
          new fabric.Image.fromURL(base64, (img) => {
            img.set("originX", "center");
            // img.set('top', 0);
            // img.set('left', 0);
            img.set("originX", "center");
            img.set("originY", "center");
            img.scaleToHeight(Math.min(imageObj.height, imageObj.width));
            img.scaleToWidth(Math.min(imageObj.height, imageObj.width));
            const group = new fabric.Group([img], {
              width: imageObj.width,
              height: imageObj.height,
              top: imageObj.centerY,
              left: imageObj.centerX,
              originX: "center",
              originY: "center",
              id: imageObj.id,
              uuid: imageObj.uuid,
              // zIndex: imageObj.zIndex,
              // hasControls: true,
            });

            // canvas.add(group)
            // console.log(group)
            group.clone();
            resolve(group);
          });
        });

        return object;
      })
    );

    return imageObjects.filter((v) => v);
  };

  const download = () => {
    const a = document.createElement("a");
    var svgBlob = new Blob([window._canvas.toSVG()], {
      type: "image/svg+xml;charset=utf-8",
    });
    // console.log(ecbCanvas.toSVG());
    var svgUrl = URL.createObjectURL(svgBlob);
    a.href = svgUrl;
    a.setAttribute("download", "data.svg");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // load canvas
  useEffect(() => {
    objects
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach((object) => {
        window._canvas.add(object);
      });

    
  }, [objects]);
  // console.log(objects[0]);
  return (
    <div className="container mx-auto bg-red">
      <div className="py-5 px-5">
        <div className="flex">
          <div
            ref={canvasContainerRef}
            style={{ height: 800, width: 800 }}
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
