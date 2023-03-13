import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { CUSTOMDATA } from "./const/customization";
import { TEMPLATE_2 } from "./const/template";
import { mappingCustomizationData } from "./utils/customization";
import { loadImageFromUrl } from "./utils/util";

const DEMO_TEMPLATE = TEMPLATE_2;

const baseUrl = "https://cdn.customily.com";
// const imageMapping = {
//   1: "/product-images/219f9106-81a5-435f-b199-56d16113db4d-219f9106-81a5-435f-b199-56d16113db4d.png",
//   10: "/product-images/2f1c2861-a17b-4381-88ce-f1869767fe10-2f1c2861-a17b-4381-88ce-f1869767fe10.png",
//   12: "/product-images/0a99883e-648d-44fb-9d62-e367dea8cbf5-0a99883e-648d-44fb-9d62-e367dea8cbf5.png",
//   6: "/product-images/8ae5893f-ba5a-4581-ad0c-48d8094807c6-8ae5893f-ba5a-4581-ad0c-48d8094807c6.png",
//   4: "/product-images/2fa932de-0b9a-4846-a439-6a51bb625ca3-2fa932de-0b9a-4846-a439-6a51bb625ca3.png",
// };

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

    const epsData = mappingCustomizationData(TEMPLATE_2, CUSTOMDATA);

    loadEPSData(epsData).then((imageObjects) => {
      setObjects(objects.concat(...imageObjects));
    });
    window._canvas = canvas;
    return () => {
      canvas.dispose();
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

  const loadEPSData = async (epsData = []) => {
    const fabricbjects = await Promise.all(
      epsData.map(async (epsObj) => {
        switch (epsObj.customType) {
          case "image": {
            let base64;
            if (epsObj.imageLibraryId) {
              const positionObject = await fetch(
                `https://app.customily.com/api/Libraries/${epsObj.imageLibraryId}/Elements/Position/${epsObj.customData.position}`
              ).then((v) => v.json());
              base64 = await loadImage(
                `${baseUrl}${positionObject.Path.replace("/Content", "")}?r=0`
              );
            } else {
              base64 = await loadImage(
                `${baseUrl}${epsObj.currentImagePath.replace(
                  "/Content",
                  ""
                )}?r=0`
              );
            }

            const object = await new Promise((resolve, reject) => {
              new fabric.Image.fromURL(base64, (img) => {
                // img.set('top', 0);
                // img.set('left', 0);
                img.set("originX", "center");
                img.set("originY", "center");
                img.scaleToHeight(Math.min(epsObj.height, epsObj.width));
                img.scaleToWidth(Math.min(epsObj.height, epsObj.width));
                const group = new fabric.Group([img], {
                  ...epsObj,
                  width: epsObj.width,
                  height: epsObj.height,
                  top: epsObj.centerY,
                  left: epsObj.centerX,
                  originX: "center",
                  originY: "center",
                  id: epsObj.id,
                  uuid: epsObj.uuid,
                });
                resolve(group);
              });
            });

            return object;
          }

          case "text": {
            let base64;
            if (epsObj.fontLibraryId) {
              const positionObject = await fetch(
                `https://app.customily.com/api/Libraries/${epsObj.fontLibraryId}/Elements/Position/${epsObj.customData.position}`
              ).then((v) => v.json());
              base64 = await loadImage(
                `${baseUrl}${positionObject.Path.replace("/Content", "")}`
              );
            } else {
              base64 = await loadImage(
                `${baseUrl}${epsObj.currentFontPath.replace("/Content", "")}`
              );
            }
            
            await loadFonts("demo1", `url('${base64}')`);
            fabric.fontPaths["demo1"] = base64;

            const text = new fabric.IText(epsObj.customData.textValue);
            epsObj.fontSize = (epsObj.maxSizePx / epsObj.minSizePx) * 2;
            text.set("originX", "center");
            text.set("originY", "center");
            text.set("fontSize", epsObj.fontSize || 200);
            text.set("backgroundColor", "rgba(0,0,0,0)");
            text.set("strokeWidth", 1);
            text.set("fontWeight", "bold");
            text.set("fontFamily", "demo1");
            // text.set("fontStyle", "regular");
            console.log(text.toSVG());
            const group = new fabric.Group([text], {
              ...epsObj,
              width: epsObj.width,
              height: epsObj.height,
              top: epsObj.centerY,
              left: epsObj.centerX,
              originX: "center",
              originY: "center",
              id: epsObj.id,
              uuid: epsObj.uuid,
            });

            return group;
          }

          default: {
            console.log("Unknown object ", epsObj);
            break;
          }
        }
      })
    );

    return fabricbjects.filter((v) => v);
  };

  const download = () => {
    const a = document.createElement("a");
    // window._canvas.setWidth(4050);
    // window._canvas.setHeight(4650);
    var svgBlob = new Blob([window._canvas.toSVG()], {
      type: "image/svg+xml;charset=utf-8",
    });
    console.log(window._canvas.toSVG());
    var svgUrl = URL.createObjectURL(svgBlob);
    a.href = svgUrl;
    a.setAttribute("download", "data.svg");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  async function loadFonts(name, url) {
    const font = new FontFace(name, url);
    // wait for font to be loaded
    await font.load();
    // add font to document
    document.fonts.add(font);
  }

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
            className="border boder-1 w-auto flex justify-center py-3"
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
