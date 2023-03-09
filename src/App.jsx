import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { TEMPLATE_1, TEMPLATE_2 } from "./const/template";

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
  const [ecbCanvas, setCanvas] = useState(null);
  const canvasContainerRef = useRef(null);

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
    canvas.setDimensions({
      width: canvas.getWidth() * scaleRatio,
      height: canvas.getHeight() * scaleRatio,
    });
    canvas.setZoom(scaleRatio);

    const { imagePlaceHoldersEps } = eps;
    loadImages(canvas, imagePlaceHoldersEps);
    // loadImage(
    //   "https://cdn.customily.com/product-images/f0206eb8-237c-44e2-851e-0ef4247aed0f.jpg?r=0"
    // )
    //   .then((base64) => {
    //     new fabric.Image.fromURL(base64, (img) => {
    //       const group = new fabric.Group([img], {
    //         width: preview.width,
    //         height: preview.height,
    //         top: 0,
    //         left: 0,
    //         originX: "left",
    //         originY: "top",
    //       });
    //       canvas.add(group);
    //     });
    //   })
    //   .finally(async () => {
    //     loadImage(
    //       "https://cdn.customily.com/product-images/482500dd-4a7c-49ac-b28a-591d9020a9ff.png"
    //     ).then((base64) => {
    //       const image1 = {
    //         id: 4,
    //         uuid: "a18b2874-554f-4004-a383-173af9ffc12e",
    //         imagePath: null,
    //         width: 660.25,
    //         height: 674.98,
    //         centerX: 401.09,
    //         centerY: 468.37,
    //         rotation: 0,
    //         color: '{"alpha":1,"hex":"#000000","cmyk":"0,0,0,1"}',
    //         fullColor: true,
    //         grading: false,
    //         opacity: 1,
    //         skewX: 0,
    //         skewY: 0,
    //         zIndex: 0,
    //         hasStaticImage: false,
    //         imageUrl: null,
    //         maskPath: null,
    //         dynamicImagesPath: "[]",
    //         mapConfig: null,
    //         coverMaskArea: false,
    //         rotationStep: 1,
    //         colors: [],
    //         colorLibraryId: null,
    //         imageLibraryId: 214920,
    //         removeWhiteBackground: false,
    //         RemoveBackground: false,
    //         cartoonize: null,
    //         CutoutFace: null,
    //         removeBackgroundCOP: null,
    //         locked: false,
    //         visible: true,
    //       };
    //       new fabric.Image.fromURL(base64, (img) => {
    //         // console.log(img, "asdasd");
    //         // img.set('top', 0);
    //         // img.set('left', 0);
    //         img.set("originX", "center");
    //         img.set("originY", "center");
    //         img.scaleToHeight(Math.min(image1.height, image1.width));
    //         img.scaleToWidth(Math.min(image1.height, image1.width));
    //         const group = new fabric.Group([img], {
    //           width: image1.width,
    //           height: image1.height,
    //           top: image1.centerY,
    //           left: image1.centerX,
    //           originX: "center",
    //           originY: "center",
    //         });

    //         canvas.add(group);
    //       });
    //     });

    //     loadImage(
    //       "https://cdn.customily.com/product-images/160e3122-2425-4e88-a6ef-cfe3525e823e-160e3122-2425-4e88-a6ef-cfe3525e823e.png"
    //     ).then((base64) => {
    //       const image1 =       {
    //         id: 3,
    //         uuid: "ff1aa552-65f8-490f-a2a9-74295abcdb2b",
    //         imagePath: null,
    //         width: 436.43,
    //         height: 359.01,
    //         centerX: 406.31,
    //         centerY: 462.7,
    //         rotation: 0,
    //         color: '{"alpha":1,"hex":"#000000","cmyk":"0,0,0,1"}',
    //         fullColor: true,
    //         grading: false,
    //         opacity: 1,
    //         skewX: 0,
    //         skewY: 0,
    //         zIndex: 1,
    //         hasStaticImage: false,
    //         imageUrl: null,
    //         maskPath: null,
    //         dynamicImagesPath: "[]",
    //         mapConfig: null,
    //         coverMaskArea: false,
    //         rotationStep: 1,
    //         colors: [],
    //         colorLibraryId: null,
    //         imageLibraryId: 214937,
    //         removeWhiteBackground: false,
    //         RemoveBackground: false,
    //         cartoonize: null,
    //         CutoutFace: null,
    //         removeBackgroundCOP: null,
    //         locked: false,
    //         visible: true,
    //       };
    //       new fabric.Image.fromURL(base64, (img) => {
    //         img.set('top', 0);
    //         img.set('left', 0);
    //         img.set("originX", "center");
    //         img.set("originY", "center");
    //         img.scaleToHeight(Math.min(image1.height, image1.width));
    //         img.scaleToWidth(Math.min(image1.height, image1.width));

    //         // console.log
    //         const group = new fabric.Group([img], {
    //           width: image1.width,
    //           height: image1.height,
    //           top: image1.centerY,
    //           left: image1.centerX,
    //           originX: "center",
    //           originY: "center",
    //         });

    //         canvas.add(group);
    //       });
    //     });
    //   });

    setCanvas(canvas);
    window._eb = canvas;
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

  const loadImages = async (canvas, epsImages = []) => {
    for (let imageObj of epsImages) {
      if (!imageMapping[imageObj.id]) continue;
      console.log(imageMapping[imageObj.id])
      const base64 = await loadImage(`${baseUrl}${imageMapping[imageObj.id]}`);
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
        });

        canvas.add(group);
      });
    }
  };

  // console.log(ecbCanvas);
  const download = () => {
    const a = document.createElement("a");
    var svgBlob = new Blob([ecbCanvas.toSVG()], {
      type: "image/svg+xml;charset=utf-8",
    });
    console.log(ecbCanvas.toSVG());
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
