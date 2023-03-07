import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

function App() {
  const [canvas, setCanvas] = useState(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const containerWidth = canvasContainerRef.current?.offsetWidth || 500;
    const canvasWidth = 800;
    const containerHeight = canvasContainerRef.current?.offsetHeight || 500;
    const canvasHeight = 800;
    const scaleRatio = Math.min(
      containerWidth / canvasWidth,
      containerHeight / canvasHeight
    );
    const canvas = new fabric.Canvas("canvas-container", {
      width: canvasWidth,
      height: canvasHeight,
    });
    canvas.setDimensions({
      width: canvas.getWidth() * scaleRatio,
      height: canvas.getHeight() * scaleRatio,
    });
    canvas.setZoom(scaleRatio);
    if (canvas) {
      const jsonData = {
        version: "5.3.0",
        objects: [
          {
            type: "group",
            version: "5.3.0",
            originX: "center",
            originY: "center",
            left: 400,
            top: 400,
            width: 800,
            height: 800,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "image",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 800,
                height: 800,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                crossOrigin: "",
                cropX: 0,
                cropY: 0,
                src: "https://cdn.customily.com/product-images/ec1201ee-ff8e-4-43defd70-a082-47ed-a797-69638f783492.jpg",
                filters: [],
              },
              {
                type: "rect",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 800,
                height: 800,
                fill: "rgba(0, 0, 0, 0)",
                stroke: "#000000",
                strokeWidth: 0,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                rx: 0,
                ry: 0,
              },
            ],
          },
          {
            type: "group",
            version: "3.6.6",
            originX: "center",
            originY: "center",
            left: 403.34,
            top: 348.16,
            width: 361.72,
            height: 361.72,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "image",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 800,
                height: 800,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 0.45,
                scaleY: 0.45,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                crossOrigin: "",
                cropX: 0,
                cropY: 0,
                src: "https://cdn.customily.com/product-images/7b58ed84-f3f9-4ae1-baef-621c74f723d2.png",
                filters: [],
              },
              {
                type: "rect",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 361.72,
                height: 361.72,
                fill: "rgba(0, 0, 0, 0)",
                stroke: "#000000",
                strokeWidth: 0,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                rx: 0,
                ry: 0,
              },
            ],
          },
          {
            type: "group",
            version: "3.6.6",
            originX: "center",
            originY: "center",
            left: 392.3,
            top: 333.49,
            width: 208.63,
            height: 208.63,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "image",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 800,
                height: 800,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 0.26,
                scaleY: 0.26,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                crossOrigin: "",
                cropX: 0,
                cropY: 0,
                src: "https://cdn.customily.com/product-images/317c96ad-1ffb-4e06-a279-7aa1d1bf3e6d.png",
                filters: [],
              },
              {
                type: "rect",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 208.63,
                height: 208.63,
                fill: "rgba(0, 0, 0, 0)",
                stroke: "#000000",
                strokeWidth: 0,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                rx: 0,
                ry: 0,
              },
            ],
          },
          {
            type: "group",
            version: "3.6.6",
            originX: "center",
            originY: "center",
            left: 415.06,
            top: 387.46,
            width: 162.6,
            height: 162.6,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "image",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 800,
                height: 800,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 0.2,
                scaleY: 0.2,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                crossOrigin: "",
                cropX: 0,
                cropY: 0,
                src: "https://cdn.customily.com/product-images/38622123-d39d-4d65-9d68-ee9c6a8c9b23-38622123-d39d-4d65-9d68-ee9c6a8c9b23.png",
                filters: [],
              },
              {
                type: "rect",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 162.6,
                height: 162.6,
                fill: "rgba(0, 0, 0, 0)",
                stroke: "#000000",
                strokeWidth: 0,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                rx: 0,
                ry: 0,
              },
            ],
          },
          {
            type: "group",
            version: "3.6.6",
            originX: "center",
            originY: "center",
            left: 392.3,
            top: 333.49,
            width: 208.63,
            height: 208.63,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "image",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 800,
                height: 800,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 0.26,
                scaleY: 0.26,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                crossOrigin: "",
                cropX: 0,
                cropY: 0,
                src: "https://cdn.customily.com/product-images/b325d304-0715-4fd8-a649-cf027b2f6baf.png",
                filters: [],
              },
              {
                type: "rect",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 208.63,
                height: 208.63,
                fill: "rgba(0, 0, 0, 0)",
                stroke: "#000000",
                strokeWidth: 0,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                rx: 0,
                ry: 0,
              },
            ],
          },
          {
            type: "group",
            version: "3.6.6",
            originX: "center",
            originY: "center",
            left: 414.48,
            top: 387.18,
            width: 159.56,
            height: 159.55,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "image",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 800,
                height: 800,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 0.2,
                scaleY: 0.2,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                crossOrigin: "",
                cropX: 0,
                cropY: 0,
                src: "https://cdn.customily.com/product-images/9115ec4f-21e2-4c49-ab0c-82cda2d5a150.png",
                filters: [],
              },
              {
                type: "rect",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 159.56,
                height: 159.55,
                fill: "rgba(0, 0, 0, 0)",
                stroke: "#000000",
                strokeWidth: 0,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                rx: 0,
                ry: 0,
              },
            ],
          },
          {
            type: "group",
            version: "3.6.6",
            originX: "center",
            originY: "center",
            left: 414.48,
            top: 387.18,
            width: 159.56,
            height: 159.55,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "image",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 800,
                height: 800,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 0.2,
                scaleY: 0.2,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                crossOrigin: "",
                cropX: 0,
                cropY: 0,
                src: "https://cdn.customily.com/product-images/8bcabc2e-c08c-4027-8427-668c7868ba93-8bcabc2e-c08c-4027-8427-668c7868ba93.png",
                filters: [],
              },
              {
                type: "rect",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 159.56,
                height: 159.55,
                fill: "rgba(0, 0, 0, 0)",
                stroke: "#000000",
                strokeWidth: 0,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                rx: 0,
                ry: 0,
              },
            ],
          },
          {
            type: "textbox",
            version: "3.6.6",
            originX: "center",
            originY: "center",
            left: 505.47,
            top: 328.38,
            width: 89.96,
            height: 26.77,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: [0, 0],
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            clipTo: null,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            transformMatrix: null,
            skewX: 0,
            skewY: 0,
            text: "asdasd",
            objects: [
              {
                type: "opentype-itext",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: -44.94,
                top: 0,
                width: 0.09,
                height: 20.31,
                fill: "#221007",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "rgba(0,0,0,0)",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                text: "asdsa",
              },
              {
                type: "rect",
                version: "3.6.6",
                originX: "center",
                originY: "center",
                left: 0,
                top: 0,
                width: 89.96,
                height: 26.77,
                fill: "rgba(0, 0, 0, 0)",
                stroke: "#000000",
                strokeWidth: 0,
                strokeDashArray: [0, 0],
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                clipTo: null,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                transformMatrix: null,
                skewX: 0,
                skewY: 0,
                rx: 0,
                ry: 0,
              },
            ],
          },
        ],
      };
      // console.log(canvas.toDatalessJSON());
      // console.log(canvas.toJSON());
      canvas.loadFromJSON(jsonData);
    }
    setCanvas(canvas);
    // return () => {
    //   setCanvas(null)
    // }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="py-5 border boder-1">
        <div
          ref={canvasContainerRef}
          style={{ height: 600 }}
          className="w-full h-full"
        >
          <canvas id="canvas-container"></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;