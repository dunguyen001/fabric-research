import { Layer, Rect, Stage } from "react-konva"

export const EditorContainer = ({
    stageWidth,
    stageHeight,
    layers,
}) => {
    return (
        <div className="w-full h-full">
            <Stage width={stageWidth} height={stageHeight} className="w-full">
                <Layer>
                    {
                        layers.map(v => {
                            if (v.type === 'rect') {
                                return <Rect {...v}/>
                            }
                        })
                    }
                </Layer>
            </Stage>
        </div>
    )
}