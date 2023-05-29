import logo from "./logo.svg"
import "./App.css"
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"
import { useEffect, useRef } from "react"
import { fabric } from "fabric"
import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import FabricCanvas from "./components/FabricCanvas"
import { saveAs } from "file-saver"

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
	// handle drag and drop image 
	const handleDrop = (e) => {
		e.preventDefault()
		const reader = new FileReader()
		const file = e.dataTransfer.files[0]
		reader.onload = () => {
			const dataUrl = reader.result
			// add url img to fabric js
			fabric.Image.fromURL(dataUrl, (img) => {
				editor?.canvas.add(img)
				img.scaleToWidth(500)
				img.scaleToHeight(500)
			})
		}
		reader.readAsDataURL(file)
	
	}
	const handleDragOver = (e) => {
		e.preventDefault()
	}
	// handle drag and drop image


	// onAddCircle use for add circle in canvas
	const onAddCircle = () => {
		// editor?.addCircle()
		const circle = new fabric.Circle({
			radius: 20,
			fill: "green",
			left: 100,
			top: 100,
		})
		editor?.canvas.add(circle)
		circle.on("selected", function () {
			console.log(circle.toJSON())
		})
	}
	// chage circle color based on selected color
	const handleChangeCircleColor = (e) => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ fill: e.target.value })
		editor?.canvas.renderAll()
	}

	//  end of circle

	//  rectangle
	const onAddRectangle = () => {
		editor?.addRectangle()
	}
	// make no fill for rectangle
	const handleNoFill = () => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ fill: "transparent" })
		editor?.canvas.renderAll()
	}
	// make no stroke for rectangle
	const handleNoStroke = () => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ stroke: "transparent" })
		editor?.canvas.renderAll()
	}
	// change rectangle color based on selected color
	const handleChangeRectangleColor = (e) => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ fill: e.target.value })
		editor?.canvas.renderAll()
	}

	// end of rectangle

	const onAddLine = () => {
		editor?.addLine()
		console.log(editor?.canvas.height)
	}
	const addText = () => {
		const text = new fabric.IText("hello world", {
			left: 100,
			top: 100,
			fontFamily: "helvetica",
			fill: "#F79327",
			fontSize: 50,
		})
		editor?.canvas.add(text)
		text.on("selected", function () {
			console.log(JSON.stringify(text))
		})
	}
	// modify text color based on selected color
	const hadleChangeColor = (e) => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ fill: e.target.value })
		editor?.canvas.renderAll()
	}
	//  handle change font size based on selected font size that provided in input
	const handleChangeFontSize = (e) => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ fontSize: e.target.value })
		editor?.canvas.renderAll()
	}
	// handle change font family based on selected font family that provided in input
	const handleChangeFontFamily = (e) => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ fontFamily: e.target.value })
		editor?.canvas.renderAll()
	}
	// handle change font weight based on selected font weight that provided in input
	const handleChangeFontWeight = (e) => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ fontWeight: e.target.value })
		editor?.canvas.renderAll()
	}
	// handle change font style based on selected font style that provided in input
	const handleChangeFontStyle = (e) => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ fontStyle: e.target.value })
		editor?.canvas.renderAll()
	}
	// handle set underline for text
	const handleUnderline = () => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.set({ underline: true })
		editor?.canvas.renderAll()
	}
	//  end of modify text object

	// handle upload image fomr local and convert to url

	// const handleUploadImage = (e) => {
	// 	const url = URL.createObjectURL(e.target.files)
	// 	const reader = new FileReader()
	// 	reader.onload = () => {
	// 		const dataUrl = reader.result
	// 		// add url img to fabric js
	// 		fabric.Image.fromURL(dataUrl, (img) => {
	// 			editor?.canvas.add(img)
	// 			img.scaleToWidth(500)
	// 			img.scaleToHeight(500)
	// 		})
	// 	}
	// 	reader.readAsDataURL(url)
	// }

	// handle upload image from local and convert to url
	const handleUploadImage = (e) => {
		const file = e.target.files[0]
		const reader = new FileReader()
		reader.onload= ()=>{
			const dataUrl = reader.result
			// add url img to fabric js
			fabric.Image.fromURL(dataUrl, (img) => {
				editor?.canvas.add(img)
				img.scaleToWidth(500)
				img.scaleToHeight(500)
			})

		}
		reader.readAsDataURL(file)
	}

	// add image in canvas
	const addImage = (url) => {
		let img = url
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
					img.scaleToWidth(500)
					img.scaleToHeight(500)
					console.log(img.toJSON())
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
						img.on("mouse:dblclick", (e) => {
							console.log(e.target)
						})
						img.scaleToWidth(400)
						img.scaleToHeight(400)
					}
			  )
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

	const deleteHadler = () => {
		const activeObject = editor?.canvas.getActiveObject()
		editor?.canvas.remove(activeObject)
	}
	const hadleDeleteAll = () => {
		editor?.canvas.clear()
	}

	//   handle

	//  filter
	const handleSetBlackAndWhite = () => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.filters.push(new fabric.Image.filters.Grayscale())
		activeObject.applyFilters()
		editor?.canvas.renderAll()
	}
	// set to hue
	const handleInvert = () => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.filters.push(new fabric.Image.filters.Invert())
		activeObject.applyFilters()
		editor?.canvas.renderAll()
	}
	// set to sepia
	const handleSepia = () => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.filters.push(new fabric.Image.filters.Sepia())
		activeObject.applyFilters()
		editor?.canvas.renderAll()
	}
	//   set blur image
	const handleBlur = () => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.filters.push(new fabric.Image.filters.Blur({ blur: 0.5 }))
		activeObject.applyFilters()
		editor?.canvas.renderAll()
	}
	// brightness based on range input
	const [brightness, setBrightness] = useState(50)
	const handleBrightness = (e) => {
		setBrightness(e.target.value)
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.filters.push(
			new fabric.Image.filters.Brightness({
				brightness: parseInt(e.target.value),
			})
		)
		if (activeObject) {
			activeObject.applyFilters()
		}
		if (!activeObject) {
			alert("Please add image first")
		}
		editor?.canvas.renderAll()
	}

	//   handle reset all filter by one click
	const handleReset = () => {
		editor?.canvas.clear()
	}

	const handleResetSeleteced = () => {
		const activeObject = editor?.canvas.getActiveObject()
		activeObject.filters = []
		activeObject.applyFilters()
		editor?.canvas.renderAll()
	}

	// handle save as json
	const save = () => {
		const json = JSON.stringify(editor?.canvas.toJSON())
		console.log(json)
		// const saveJSON = editor?.canvas.toJSON()
		// console.log(saveJSON)
		// const kanvas = new fabric.Canvas("canvas")
		// kanvas.toJSON(saveJSON)
		// kanvas.loadFromJSON(saveJSON)
		// alert(JSON.stringify(saveJSON))

		// fabric.log('JSON with additional properties included: ', editor.canvas.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling']));
	}
	// save as svg
	const saveAsSVG = () => {
		//  save all added element as svg
		// save all added element include images as svg
		const allAddedElement = editor?.canvas.getObjects()
		const svg = editor?.canvas.toSVG(allAddedElement)
		const blob = new Blob([svg], { type: "image/svg+xml" })
		saveAs(blob, "mySVG.svg")
		// save all added element include images as svg
	}
	// working
	const handleSave = () => {
		const activeObject = editor?.canvas.getActiveObject()
		const json = JSON.stringify(activeObject.toJSON())
		console.log(json)
	}

	// try filter
	const [filter, setFilter] = useState({
		filterName: "grayscale",
		options: {},
	})
	const handleChangeFilter = (e) => {
		setFilter({
			filterName: e.target.value,
			options: {},
		})
	}

	// make redirect save as svg with filesaver.js in fabric js
	const saveAsSVGWithFileSaver = () => {
		const svg = editor?.canvas.toSVG()
		const blob = new Blob([svg], { type: "image/svg+xml" })
		saveAs(blob, "mySVG.svg")
	}


	// send to back ro front

	const handleSendToBack = ()=>{
		const activeObject = editor?.canvas.getActiveObject()
		if(activeObject){
			activeObject.sendToBack()
		}
		editor?.canvas.renderAll()

	}

	const handleSendToFont = ()=>{
		const activeObject = editor?.canvas.getActiveObject()
		if(activeObject){
			activeObject.bringToFront()
		}
		editor?.canvas.renderAll()
	}
	// handle save as json by convert file base-64 encoder to filepath 
	const saveFilePath = ()=>{
		const json = JSON.stringify(editor?.canvas.toJSON())
		const blob = new Blob([json], {type: "application/json"})
		const url = URL.createObjectURL(blob)
		const link = document.createElement("a")
		link.download = "myJson.json"
		link.href = url
		link.click()
		URL.revokeObjectURL(url)
		console.log(json);

	}
	


	// redirect save ass element that added to svg with filesaver.js in fabric js
	// const webglBackend = new fabric.WebglFilterBackend()
	// const canvas2dBackend = new fabric.Canvas2dFilterBackend()
	fabric.filterBackend = fabric.initFilterBackend()
	fabric.Object.prototype.transparentCorners = false

	return (
		<div className='App'>
			<button onClick={onAddCircle}>Add Circle</button>
			<button onClick={onAddRectangle}>Add Rectangle</button>
			<button onClick={() => addImage("")}>Add Image</button>
			<button onClick={onAddLine}>Add Line</button>
			<button onClick={addText}>Add Text</button>
			{/* <button onClick={addTextBox}>Add Text Box</button> */}
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
			<h1>filter</h1>
			{/* set circle color based selected color    */}
			circle color
			<input
				type='color'
				onChange={handleChangeCircleColor}
			/>
			{/* set rectangle color based selected color    */}
			rectangle color
			<input
				type='color'
				onChange={handleChangeRectangleColor}
			/>
			{/* set no fill for rectangle */}
			<button onClick={handleNoFill}>No fill</button>
			{/* set no stroke for rectangle */}
			<button onClick={handleNoStroke}>No stroke rectangle</button>
			<div>
				black white
				<input
					onClick={handleSetBlackAndWhite}
					type='checkbox'
				/>
				<button onClick={handleReset}>Reset all </button>
				<button onClick={handleResetSeleteced}>Reset selected </button>
				<button onClick={handleInvert}>Invert</button>
				<button onClick={handleSepia}>Sepia</button>
				<button onClick={handleBlur}>Blur</button>
				<button onClick={handleSendToBack}>Send to back</button>
				<button onClick={handleSendToFont}>Send to front</button>
				<button onClick={saveFilePath}>test save</button>
				
				<br />
				{/* selection of 5 color for handle text color change */}
				text color{" "}
				<input
					type='color'
					onChange={hadleChangeColor}
				/>
				{/* selection of 5 font size for handle text font size change */}
				<input
					type='number'
					onChange={handleChangeFontSize}
				/>
				{/* selection of 5 font family for handle text font family change */}
				<select onChange={handleChangeFontFamily}>
					<option value='arial'>Arial</option>
					<option value='helvetica'>Helvetica</option>
					<option value='myriad pro'>Myriad Pro</option>
					<option value='delicious'>Delicious</option>
					<option value='verdana'>Verdana</option>
					<option value='georgia'>Georgia</option>
					<option value='courier'>Courier</option>
					<option value='comic sans ms'>Comic Sans MS</option>
					<option value='impact'>Impact</option>
					<option value='monaco'>Monaco</option>
					<option value='optima'>Optima</option>
					<option value='hoefler text'>Hoefler Text</option>
					<option value='plaster'>Plaster</option>
					<option value='engagement'>Engagement</option>
				</select>
				{/* selection font weight for handle text font weight change */}
				<select onChange={handleChangeFontWeight}>
					<option value='normal'>Normal</option>
					<option value='bold'>Bold</option>
				</select>
				{/* selection font style for handle text font style change */}
				<select onChange={handleChangeFontStyle}>
					<option value='normal'>Normal</option>
					<option value='italic'>Italic</option>
				</select>
				<button onClick={handleUnderline}>Underline</button>
				<br />
				brightness :{" "}
				<input
					type='range'
					min='0'
					max='100'
					value={filter.options.brightness}
					onChange={handleBrightness}
				/>
			</div>
			<button onClick={handleSave}>Save selected element</button>
			<button onClick={saveAsSVG}>Save as SVG</button>
			<button onClick={saveAsSVGWithFileSaver}>
				Save as SVG with file saver
			</button>
			<input
				type='file'
				onChange={handleUploadImage}
				multiple
			/>
			<div 
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			style={{width: "500px", height: "500px", border: "1px solid black"}}
			>
			drage and drop here
			</div>
			<FabricJSCanvas
				// editable={true}
				onReady={onReady}
				className='canvas '
			/>
		</div>
	)
}

export default App
