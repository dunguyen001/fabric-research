import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { CUSTOMDATA, CUSTOMDATA2 } from "./const/customization";
import { MOCKUP_1, TEMPLATE_2 } from "./const/template";
import {
  mappingCustomizationData,
  mappingCustomizationDataPreview,
} from "./utils/customization";
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
  const [canvasContainer, setCanvasContainer] = useState([600, 600]);
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const { eps, preview } = TEMPLATE_2;

    const containerWidth = canvasContainer[0];
    const canvasWidth = eps.width;
    const containerHeight = canvasContainer[1];
    const canvasHeight = eps.height;
    const scaleRatio = Math.min(
      containerWidth / canvasWidth,
      containerHeight / canvasHeight
    );

    const canvas = new fabric.Canvas("canvas-container", {
      width: canvasWidth,
      height: canvasHeight,
      enableRetinaScaling: true,
      preserveObjectStacking: true,
      fireRightClick: true,
      svgViewportTransformation: true,
    });

    const dimensions = {
      width: canvas.getWidth() * scaleRatio,
      height: canvas.getHeight() * scaleRatio,
    };
    setCanvasContainer([dimensions.width, dimensions.height]);
    canvas.setDimensions(dimensions);

    canvas.setZoom(scaleRatio);
    const epsData = mappingCustomizationData(TEMPLATE_2, CUSTOMDATA);
    loadEPSData(epsData).then((imageObjects) => {
      setObjects(objects.concat(...imageObjects));
    });
    // const data = mappingCustomizationDataPreview(MOCKUP_1, CUSTOMDATA2);
    // loadPreviewData(data).then((imageObjects) => {
    //   setObjects(objects.concat(...imageObjects));
    // });
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
                `${baseUrl}${positionObject.Path.replace("/Content", "")}`
              );
            } else {
              base64 = await loadImage(
                `${baseUrl}${epsObj.currentImagePath.replace("/Content", "")}`
              );
            }

            const object = await new Promise((resolve, reject) => {
              new fabric.Image.fromURL(base64, (img) => {
                img.set("originX", "center");
                img.set("originY", "center");
                img.scaleToWidth(Math.min(epsObj.width, epsObj.height));
                img.scaleToHeight(Math.min(epsObj.width, epsObj.height));
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
            // epsObj.fontSize = (epsObj.maxSizePx / epsObj.minSizePx) * 2;
            // const p = epsObj.maxSizePx / 200
            // console.log(epsObj.maxSizePx / 200)
            // const fontSize = p * 200;
            text.set("fontSize", 200);
            text.set("originX", "center");
            text.set("originY", "center");
            text.set("backgroundColor", "rgba(0,0,0,0)");
            text.set("strokeWidth", 1);
            text.set("fontWeight", "bold");
            text.set("fontFamily", "demo1");
            text.set("fill", epsObj.textColor);
            console.log(text.width)
            const d = epsObj.maxSizePx / text.width
            const u = epsObj.minSizePx / text.height;
            let p = Math.min(d, u)
            let h = p * 200;
            if (h > epsObj.maxSizePx) {
              h = epsObj.maxSizePx
            }

            if (h < epsObj.minSizePx) {
              p = epsObj.maxSizePx / 200
              console.log(p)
              h = p * 200
            }
            text.set("fontSize", h);
            text.scaleToWidth(epsObj.width);
            text.scaleToHeight(epsObj.height);
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

  const loadPreviewData = async (previewData = []) => {
    const fabricbjects = await Promise.all(
      previewData.map(async (object) => {
        switch (object.customType) {
          case "image": {
            let base64;
            if (object.imageLibraryId) {
              console.log(
                `https://app.customily.com/api/Libraries/${object.imageLibraryId}/Elements/Position/${object.customData.position}`
              );
              const positionObject = await fetch(
                `https://app.customily.com/api/Libraries/${object.imageLibraryId}/Elements/Position/${object.customData.position}`
              ).then((v) => v.json());

              if (positionObject) {
                base64 = await loadImage(
                  `${baseUrl}${positionObject.Path.replace("/Content", "")}`
                );
              } else if (object.currentImagePath) {
                base64 = await loadImage(
                  `${baseUrl}${object.currentImagePath.replace("/Content", "")}`
                );
              }
            } else {
              base64 = await loadImage(
                `${baseUrl}${object.currentImagePath.replace("/Content", "")}`
              );
            }

            const _object = await new Promise((resolve, reject) => {
              new fabric.Image.fromURL(base64, (img) => {
                img.set("originX", "center");
                img.set("originY", "center");
                img.scaleToWidth(Math.min(object.width, object.height));
                img.scaleToHeight(Math.min(object.width, object.height));
                const group = new fabric.Group([img], {
                  ...object,
                  width: object.width,
                  height: object.height,
                  top: object.centerY,
                  left: object.centerX,
                  originX: "center",
                  originY: "center",
                  id: object.id,
                  uuid: object.uuid,
                });
                resolve(group);
              });
            });

            return _object;
          }

          case "text": {
            let base64;
            if (object.fontLibraryId) {
              const positionObject = await fetch(
                `https://app.customily.com/api/Libraries/${object.fontLibraryId}/Elements/Position/${object.customData.position}`
              ).then((v) => v.json());
              base64 = await loadImage(
                `${baseUrl}${positionObject.Path.replace("/Content", "")}`
              );
            } else {
              base64 = await loadImage(
                `${baseUrl}${object.currentFontPath.replace("/Content", "")}`
              );
            }

            await loadFonts("demo1", `url('${base64}')`);
            fabric.fontPaths["demo1"] = base64;

            const text = new fabric.IText(
              String(object.customData.textValue).toUpperCase()
            );
            const p = object.maxSizePx / 200
            const fontSize = p * 200;
            text.set("originX", "center");
            text.set("originY", "center");
            text.set("fontSize", fontSize);
            text.set("backgroundColor", "rgba(0,0,0,0)");
            text.set("strokeWidth", 1);
            text.set("fontWeight", "bold");
            text.set("fontFamily", "demo1");
            text.set("fill", object.textColor);
            // text.scaleToWidth(object.width);
            // text.scaleToHeight(object.height);
            const group = new fabric.Group([text], {
              ...object,
              width: object.width,
              height: object.height,
              top: object.centerY,
              left: object.centerX,
              originX: "center",
              originY: "center",
              id: object.id,
              uuid: object.uuid,
            });
            // text.scaleToHeight(scaleRatio);
            return group;
          }

          default: {
            console.log("Unknown object ", object);
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
  console.log(canvasContainer);
  return (
    <div className="container mx-auto bg-red">
      <div className="py-5 px-5">
        <div className="flex">
          <div
            id="artboard"
            className="p-3 flex justify-center items-center"
            style={{ height: 800, width: 800, backgroundColor: "#d6d3d1" }}
          >
            <div
              ref={canvasContainerRef}
              style={{
                height: canvasContainer[1],
                width: canvasContainer[0],
                backgroundColor: "#ffffff",
              }}
              className="border boder-1 w-auto flex justify-center"
            >
              <canvas id="canvas-container"></canvas>
            </div>
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
