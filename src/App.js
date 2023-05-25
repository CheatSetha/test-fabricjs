import logo from "./logo.svg"
import "./App.css"
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"
import { useEffect, useRef } from "react"
import { fabric } from "fabric"
import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"

fabric.Object.prototype.transparentCorners = false
let canvas = new fabric.Canvas("canva", {
	isDrawingMode: true,
	freeDrawingCursor: new fabric.CircleBrush({ decimate: 3 }),
})

function App() {
	const { editor, onReady, selectedObjects } = useFabricJSEditor()
	const [files, setFile] = useState(null)
	const [image, setImage] = useState(null)
	const [canvas, setCanvas] = useState(" ")
	const fileTypes = ["JPEG", "PNG", "GIF"]

	// const initCanvas = () =>
	// 	new fabric.Canvas("c", {
	// 		width: 500,
	// 		height: 500,
	// 		backgroundColor: "red",
	// 	})
  //   const canvas2 = initCanvas();
  // canvas2.on("mouse:move",(e)=>{
  //   const mE = e.e;
  //   const dalta = new fabric.Point(mE.movementX,mE.movementY);
  //   canvas2.relativePan(dalta);
  //   console.log(mE.movementX,mE.movementY);
   
  // })
	// useEffect(() => {
	// 	setCanvas(initCanvas())
	// }, [])
	// const deleteCanvasBg = () => {
	// 	canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas))
	// }

	// onAddCircle use for add circle in canvas
	const onAddCircle = () => {
		// editor?.addCircle()
    const circle = new fabric.Circle({
      radius: 20,
      fill: 'green',
      left: 100,
      top: 100
    });
    editor?.canvas.add(circle);
    circle.on('selected', function() {
      console.log(circle.toJSON());
    }
    );
	}

	const onAddRectangle = () => {
		editor?.addRectangle()
	}

	const onAddLine = () => {
		editor?.addLine()
		console.log(editor?.canvas.height)
	}
	const addText = () => {
		const text = new fabric.IText("hello world", {
			left: 100,
			top: 100,
			fontFamily: "helvetica",
			fill: "#333",
			fontSize: 50,
		})
		editor?.canvas.add(text)
		text.on("selected", function () {
			console.log(JSON.stringify(text))
		})
	}
	// add image in canvas
	const addImage = (url) => {
		const img = url
			? new fabric.Image.fromURL(url, function (img) {
					// add background image
					editor?.canvas.setBackgroundImage(
						img,
						editor?.canvas.renderAll.bind(editor?.canvas),
						{
							scaleX: editor?.canvas.width / img.width,
							scaleY: editor?.canvas.height / img.height,
						}
					)
					// build
					editor?.canvas.add(img)
					img.scaleToWidth(100)
					img.scaleToHeight(100)
          console.log(img.toJSON());
			  })
			: new fabric.Image.fromURL(
					"https://www.picclickimg.com/C-IAAOSwtkNfx~od/Naruto-Ninja-Arena-jeu-de-societe-naroto.webp",
					function (img) {
						// add background image
						editor?.canvas.setBackgroundImage(
							img,
							editor?.canvas.renderAll.bind(editor?.canvas),
							{
								scaleX: editor?.canvas.width / img.width,
								scaleY: editor?.canvas.height / img.height,
							}
						)
						// build
						editor?.canvas.add(img)
						img.scaleToWidth(100)
						img.scaleToHeight(100)
					}
			  )
	}
	const addTextBox = () => {
		const text = new fabric.Textbox("hello world", {
			left: 100,
			top: 100,
			fontFamily: "Comic Sans",
			fill: "#333",
			fontSize: 50,
		})
		editor?.canvas.add(text)
	}
	const addPolygon = () => {
		const polygon = new fabric.Polygon(
			[
				{ x: 185, y: 0 },
				{ x: 250, y: 100 },
				{ x: 385, y: 170 },
				{ x: 0, y: 245 },
			],
			{
				left: 100,
				top: 100,
				fill: "red",
			}
		)
		editor?.canvas.add(polygon)
		console.log(polygon)
		polygon.on("selected", function () {
			console.log(polygon)
		})
	}

	const addPath = () => {
		const path = new fabric.Path("M 0 0 L 200 100 L 170 200 z")
		path.set({ fill: "red", stroke: "green", opacity: 0.5 })
		editor?.canvas.add(path)
	}
	// delete function
	const deleteObject = () => {
		editor?.canvas.getActiveObject()?.remove()
	}

	let draggedImg = ""
	let group = new fabric.Group()
	editor?.canvas.add(group)

	// implement upoad image
	const canvasObj = new fabric.Canvas("irgendeineincanvasobjekt", {
		backgroundColor: "#c8c8c8",
	})
	const i = 0
	let ctrImages = new Array()
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			ctrImages[i] = new Image()
			ctrImages[i].src = preload.arguments[i]
		}
	}

	const handleUpload = (event) => {
		const url = URL.createObjectURL(event.target.files[0])
		addImage(url)
	}
	const handleChange = (files) => {
		setFile(files)
	}



  const deleteHadler = ()=>{
    const activeObject = editor?.canvas.getActiveObject();
    editor?.canvas.remove(activeObject);
  }
  const hadleDeleteAll = ()=>{
    editor?.canvas.clear();
  }

  // save implement
//   let saveJSON = editor?.canvas.toJSON()
//   // let saveJSON = '{"version":"2.4.1","objects":[{"type":"rect","version":"2.4.1","originX":"left","originY":"top","left":0,"top":0,"width":100,"height":100,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0,"name":"Nono"}],"background":"#222", "width": "300", "height": "500"}'
// const kanvas = new fabric.Canvas("canvas");
// kanvas.loadFromJSON(saveJSON)


// hadle save and convert fabric to json
const save = ()=>{
  const saveJSON = editor?.canvas.toJSON()
  console.log(saveJSON);
  const kanvas = new fabric.Canvas("canvas");
  kanvas.loadFromJSON(saveJSON)
alert(JSON.stringify(saveJSON)  )
}



	return (
		<div className='App'>
			<button onClick={onAddCircle}>Add Circle</button>
			<button onClick={onAddRectangle}>Add Rectangle</button>
			<button onClick={() => addImage("")}>Add Image</button>
			<button onClick={onAddLine}>Add Line</button>
			<button onClick={addText}>Add Text</button>
			<button onClick={addTextBox}>Add Text Box</button>
			<button onClick={addPath}>Add Path</button>
      <button onClick={deleteHadler}>Delete</button>
      <button onClick={hadleDeleteAll}>Delete All</button>
			
			<button onClick={addPolygon}>Add Polygon</button>
      <button onClick={save}>Save</button>

			<input
				type='file'
				accept='image/*'
				onChange={(e) => handleUpload(e)}
			/>
     
			{image && (
				<canvas
					width={image.width}
					height={image.height}
				>
					<fabric.Image
						image={image}
						left={0}
						top={0}
						width={image.width}
						height={image.height}
					/>
				</canvas>
			)}

			{/* <canvas id="irgendeineincanvasobjekt" width="500" height="500"></canvas> */}

			<FabricJSCanvas
				editable={true}
				onReady={onReady}
				className='sample-canvas'
       
			/>
		</div>
	)
}

export default App
