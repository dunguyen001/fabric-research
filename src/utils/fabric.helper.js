/* eslint-disable no-unused-expressions */
import { fabric } from "fabric";
// var n = fabric(109);
fabric.util.createClass(fabric.Group, {
  cacheProperties: fabric.Group.prototype.cacheProperties.concat(
    "textVerticalAlign",
    "textAlign",
    "caps",
    "outlineWidth",
    "fontFamily",
    "fillPattern",
    "version",
    "lineSpacing",
    "ligatures",
    "tracking",
    "fontSize",
    "multiline",
    "minSizePx",
    "maxSizePx",
    "prefix",
    "suffix",
    "_textWithoutPrefixSuffix"
  ),
  async: !0,
  type: "bounded-text",
  lockUniScalingWithSkew: !1,
  caps: !1,
  debug: !1,
  version: "2.0.0",
  Itext: !1,
  textVerticalAlign: "center",
  lineSpacing: 1,
  _textWithoutPrefixSuffix: "",
  initialize: function (t) {
    t.fontFamily && (t.fontFamily = this._sanitizeFontFamily(t.fontFamily)),
      (t.version = t.version || fabric.BoundedText.prototype.version),
      (t.width = t.width || 300),
      (t.height = t.height || 300);
    var e = {
        width: t.width,
        height: t.height,
        fontSize: t.fontSize || 200,
        originX: "center",
        originY: "center",
        textAlign: t.textAlign || "center",
        textVerticalAlign: t.textVerticalAlign || "center",
        centeredRotation: !0,
        color: t.color || "black",
        fontFamily: t.fontFamily || "Arial",
        backgroundColor: this.debug ? "#f7dacf" : "rgba(0,0,0,0)",
        tracking: t.tracking || 0,
        version: t.version,
      },
      i = new fabric.OpentypeIText("", e);
    i.set("maxWidth", t.width), i.set("maxHeight", t.height);
    var n = new fabric.Rect({
      strokeDashArray: t.strokeDashArray,
      originX: "center",
      originY: "center",
      stroke: "#000000",
      strokeWidth: 3,
      width: t.width,
      height: t.height,
      fill: "rgba(0, 0, 0, 0)",
    });
    this.callSuper("initialize", [i, n], t),
      this.setTextAlign(t.textAlign || "center"),
      this.setText(t.Itext ? "×" : "A"),
      this.on({
        scaling: function (t) {
          if (this.lockUniScalingWithSkew) {
            var e = 1;
            (e = "scaleX" === t.transform.action ? this.scaleX : this.scaleY),
              (this.scaleX = e),
              (this.scaleY = e);
          }
        },
        scaled: function () {
          var t = this.width * this.scaleX,
            e = this.height * this.scaleY;
          (this.scaleX = 1),
            (this.scaleY = 1),
            this.setWidth(t),
            this.setHeight(e);
        },
        added: function () {
          (this.cornerSize = 0.025 * this.canvas.width),
            (this.transparentCorners = !1);
        },
      });
  },
  _getCacheCanvasDimensions: function () {
    var t = this.callSuper("_getCacheCanvasDimensions");
    return (t.height = 2 * this.height * t.zoomY), t;
  },
  updateFromGroupScaling: function () {
    var t = this.width * this.scaleX,
      e = this.height * this.scaleY;
    (this.scaleX = 1),
      (this.scaleY = 1),
      this.setWidth(t),
      this.setHeight(e),
      this.setTextAlign(this.getTextAlign());
  },
  _set: function (t, e) {
    "minSizePx" === t
      ? this.setMinSizePx(e)
      : "maxSizePx" === t
      ? this.setMaxSizePx(e)
      : "textAlign" === t
      ? this.setTextAlign(e)
      : "caps" === t
      ? this.setCaps(e)
      : "text" === t
      ? this.setText(e)
      : "outlineWidth" === t
      ? this.setOutlineWidth(e)
      : "fontFamily" === t
      ? this.setFontFamily(e)
      : "fill" === t && e.constructor === fabric.Pattern
      ? this.item(0).set("fillPattern", e)
      : "version" === t
      ? this.item(0).set("version", e)
      : "lineSpacing" === t
      ? this.item(0).set("lineSpacing", e)
      : "ligatures" === t
      ? this.item(0).set("ligatures", e)
      : "multiline" === t && this.setMultiline(e),
      this.callSuper("_set", t, e),
      ("prefix" !== t && "suffix" !== t) || this.setText(this.getText());
  },
  getTextPaths: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return this.item(0).getTextPaths(t);
  },
  setTextAlign: function (t) {
    "opentype-itext" == this.item(0).type && this.item(0).set("textAlign", t);
  },
  setTrackingAmount: function (t) {
    this.item(0).set("tracking", t || 0);
  },
  getTrackingAmount: function () {
    return this.item(0).tracking || 0;
  },
  getOutlineWidth: function () {
    return this.item(0).opentypeStrokeWidth || 0;
  },
  setOutlineWidth: function (t) {
    this.item(0).set("opentypeStrokeWidth", t || 0);
  },
  getOutlineColor: function () {
    return this.item(0).opentypeStroke || "#000000";
  },
  setOutlineColor: function (t) {
    this.item(0).set("opentypeStroke", t || "#000000");
  },
  getTextAlign: function () {
    return this.item(0).textAlign;
  },
  setCursorColor: function (t) {
    this.item(0).cursorColor = t;
  },
  setStroke: function (t) {
    this.item(1).set("stroke", t);
  },
  setStrokeWidth: function (t) {
    this.item(1).set("strokeWidth", t);
  },
  getStroke: function () {
    return this.item(1).stroke;
  },
  setColor: function (t) {
    this.item(0).setColor(t);
  },
  getColor: function () {
    return this.item(0).fill;
  },
  getText: function () {
    return this._textWithoutPrefixSuffix;
  },
  getTextWithLines: function () {
    return this.item(0).getText();
  },
  setText: function (t) {
    return (
      t || (t = ""),
      this.set("_textWithoutPrefixSuffix", t),
      t &&
        (this.caps && (t = t.toUpperCase()),
        (t = (this.prefix || "") + t + (this.suffix || ""))),
      this.item(0).set("text", this.Itext ? n.reverse(t) : t),
      t
    );
  },
  forceFontSize: function (t) {
    t
      ? (this.item(0).set("maxFontSize", t), this.item(0).set("minFontSize", t))
      : (this.item(0).set("maxFontSize", this.maxSizePx),
        this.item(0).set("minFontSize", this.minSizePx));
  },
  setFontSize: function (t) {
    this.item(0).fontSize = t;
  },
  getFontSize: function () {
    return this.item(0).fontSize;
  },
  _sanitizeFontFamily: function (t) {
    return t.indexOf("'") < 0 && (t = "'" + t + "'"), t;
  },
  setFontFamily: function (t) {
    (t = this._sanitizeFontFamily(t)), this.item(0).set("fontFamily", t);
  },
  getFontFamily: function () {
    return this.item(0).fontFamily;
  },
  setWidth: function (t) {
    t || (t = 0),
      this.set("width", t),
      this.item(1).set("width", t),
      this.item(0).set("maxWidth", t);
  },
  getWidth: function () {
    return this.width * this.scaleX;
  },
  setHeight: function (t) {
    t || (t = 0),
      this.set("height", t),
      this.item(1).set("height", t),
      this.item(0).set("maxHeight", t);
  },
  getHeight: function () {
    return this.height * this.scaleY;
  },
  setMinSizePx: function (t) {
    (this.minSizePx = t), this.item(0).set("minFontSize", t);
  },
  setMaxSizePx: function (t) {
    (this.maxSizePx = t), this.item(0).set("maxFontSize", t);
  },
  setMultiline: function (t) {
    (this.multiline = t), this.item(0).set("multiline", t);
  },
  setCaps: function (t) {
    (this.caps = t), t && this.setText(this.getText().toUpperCase());
  },
  getTextPosition: function (t, e) {
    var i = { top: 0, left: 0 };
    switch (e) {
      case "center":
        i.top = 0;
        break;
      case "top":
        i.top = (this.getHeight() - this.item(0).height) / -2;
        break;
      case "bottom":
        i.top = (this.getHeight() - this.item(0).height) / 2;
    }
    switch (t) {
      case "justify":
      case "center":
        i.left = 0;
        break;
      case "left":
        i.left = (this.getWidth() - this.item(0).width) / -2;
        break;
      case "right":
        i.left = (this.getWidth() - this.item(0).width) / 2;
    }
    return i;
  },
  drawObject: function (t) {
    var e = this.getTextPosition(this.textAlign, this.textVerticalAlign);
    this.item(0).set({ top: e.top, left: e.left }),
      this.callSuper("drawObject", t);
  },
  clone: function (t) {
    var e = new fabric.BoundedText({
      width: this.getWidth(),
      height: this.getHeight(),
      originX: "center",
      originY: "center",
      left: this.left,
      top: this.top,
      skewX: this.skewX,
      skewY: this.skewY,
      strokeDashArray: this.item(1).strokeDashArray,
      angle: this.angle,
      centeredRotation: (!0).centeredRotation,
      Itext: this.Itext,
      lockSkewingX: this.lockSkewingX,
      lockSkewingY: this.lockSkewingY,
      lockScalingFlip: !0,
      fontPath: this.fontPath,
      fontName: this.firstFontName || this.fontName,
      fontColorsMap: new Map(this.fontColorsMap),
      fontsMap: new Map(this.fontsMap),
      outlineColor: this.outlineColor,
      id: this.id,
      uuid: this.uuid,
      evented: this.evented,
      selectable: this.selectable,
      locked: this.locked,
      visible: this.visible,
      name: this.name,
      fontColorOption: this.fontColorOption,
      fontOption: this.fontOption,
      prefix: this.prefix,
      suffix: this.suffix,
      ligatures: this.ligatures,
    });
    e.setMultiline(this.multiline),
      e.setMinSizePx(this.minSizePx),
      e.setMaxSizePx(this.maxSizePx),
      e.setFontFamily(this.getFontFamily()),
      e.setFontSize(this.item(0).fontSize),
      e.setColor(this.getColor()),
      e.setStroke(this.item(1).stroke),
      e.setStrokeWidth(this.item(1).strokeWidth),
      e.setCursorColor(this.item(0).cursorColor),
      e.setTextAlign(this.item(0).textAlign),
      e.setOutlineColor(this.getOutlineColor()),
      e.setOutlineWidth(this.getOutlineWidth()),
      e.setTrackingAmount(this.getTrackingAmount()),
      e.set("caps", this.caps),
      e.set("fontLibraryId", this.fontLibraryId),
      e.set("colorLibraryId", this.colorLibraryId),
      e.set("zIndex", this.zIndex),
      e.set("version", this.version),
      e.item(0).set("version", this.version),
      e.set("prefix", this.prefix),
      e.set("suffix", this.suffix),
      e.setText(this.getText()),
      t && t(e);
  },
});
