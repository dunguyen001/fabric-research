export const loadImageFromUrl = (base64, callback) => {
  return new Promise((resolve, reject) => {
    new fabric.Image.fromURL(base64, resolve(callback));
  });
};
