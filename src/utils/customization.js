export const mappingCustomizationData = (template, customization) => {
    const { imagesParameters } = customization.CustomizationData;
    const { imagePlaceHoldersEps } = template.eps;
    
    const mappedData = []
    for (let cImage of imagesParameters) {
        const imageEps = imagePlaceHoldersEps.find(v => v.id === cImage.id);
        if (!imageEps) {
            console.log("Missing ", cImage.uuid);
            continue;
        };

        const dynamicImagesPath = new Map(JSON.parse(imageEps.dynamicImagesPath))

        mappedData.push({
            ...imageEps,
            type: "image",
            currentImagePath: dynamicImagesPath.get(cImage.position),
            customData: cImage,
        })
    }
    return mappedData.sort((a, b) => a.zIndex - b.zIndex);
}