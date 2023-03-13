export const mappingCustomizationData = (template, customization) => {
    const { imagesParameters, texts } = JSON.parse(customization.CustomizationData) ;
    const { imagePlaceHoldersEps, textsEps } = template.eps;
    
    const mappedData = []
    for (let cImage of imagesParameters) {
        const imageEps = imagePlaceHoldersEps.find(v => v.id === cImage.id && v.uuid === cImage.uuid);
        if (!imageEps) {
            console.log("Missing image", cImage.uuid);
            continue;
        };

        const dynamicImagesPath = new Map(JSON.parse(imageEps.dynamicImagesPath))

        mappedData.push({
            ...imageEps,
            customType: "image",
            currentImagePath: dynamicImagesPath.get(cImage.position),
            customData: cImage,
        })
    }

    for (let cText of texts) {
        const textEps = textsEps.find(v => v.id === cText.id && v.uuid === cText.uuid);
        if (!textEps) {
            console.log("Missing text ", cText.uuid);
            continue;
        };
        const dynamicFontsPath = new Map(JSON.parse(textEps.fontsMap))
        mappedData.push({
            ...textEps,
            currentFontPath: dynamicFontsPath.get(cText.fontId),
            customType: "text",
            customData: cText,
        })
    }
    return mappedData.sort((a, b) => b.zIndex - a.zIndex);
}