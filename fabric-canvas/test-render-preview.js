const fabric = require("fabric").fabric;

const previewData = {
  imagePath:
    "/Content/product-images/67eccb73-32bc-4765-b815-dd3f25cbe902.jpg?r=0",
  bgColor: null,
  thumbnailPath:
    "/Content/product-images/thumbnails/c25bf09a-8706-4f03-ab81-4b1232317422.png",
  width: 800,
  height: 800,
  textsPreview: [
    {
      id: 6,
      uuid: "03b5f1d2-c2e0-46b6-bdac-6ed822bdc235",
      Version: "2.0.0",
      centerX: 505.46572921249685,
      centerY: 328.3842724731194,
      color:
        '{"alpha":1,"hex":"#221007","cmyk":"0,0.5294117647058822,0.7941176470588234,0.8666666666666667"}',
      rotation: 0,
      width: 89.96163502299126,
      height: 26.772983687386244,
      minSizePx: 0.08931360463089186,
      maxSizePx: 17.862720926178376,
      multiline: false,
      caps: true,
      fontPath:
        "/Content/fonts/ecombest/belshaw-webfont-5b3f729b-dbcb-454a-85c7-88e0120450f3.ttf",
      preview: null,
      textAlign: "left",
      textVerticalAlign: null,
      outlineColor: '{"alpha":1,"hex":"#000000","cmyk":"0,0,0,1"}',
      outlineWidth: 0,
      skewX: 0,
      skewY: 0,
      zIndex: 7,
      fontsMap:
        '[[1,"/Content/fonts/ecombest/belshaw-webfont-5b3f729b-dbcb-454a-85c7-88e0120450f3.ttf"]]',
      fontColorsMap:
        '[[1,{"alpha":1,"hex":"#221007","cmyk":"0,0.5294117647058822,0.7941176470588234,0.8666666666666667"}]]',
      prefix: "",
      suffix: "",
      Itext: false,
      textures: [],
      tracking: 0,
      lineSpacing: 1,
      ligatures: true,
      colorLibraryId: null,
      fontLibraryId: null,
      locked: false,
      visible: true,
    },
  ],
  circularTextsEps: [],
  imagePlaceHoldersEps: [],
  vectorEPSEps: [],
  CreatedDate: "2023-03-07T08:17:17.220743",
  ModifiedDate: "2023-03-07T08:17:23.089758",
};

class BoundedText {
  constructor(options) {}
}

(async () => {
  const { textsPreview } = previewData;

  textsPreview.forEach((data) => {
    const textData = new fabric.Text("Hello World", {
      // fontSize:
      textAlign: data.textAlign,
      originX: "center",
      originY: "center",
      skewX: data.skewX,
      scaleY: data.skewY,
      fontFamily: 
    });
  });

  let fabricObj = [];
})();
