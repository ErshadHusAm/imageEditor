const canvas = document.getElementById('canvas');
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');

//Add filters & effects
document.addEventListener('click', (e) => {
	if(e.target.classList.contains('filter-btn')) {
		if(e.target.classList.contains('brightness-add')){
			Caman('#canvas', img, function(){
				this.brightness(5).render();
			});
		} else if(e.target.classList.contains('brightness-remove')) {
			Caman('#canvas', img, function(){
				this.brightness(-5).render();
			});
		} else if(e.target.classList.contains('contrast-add')) {
			Caman('#canvas', img, function(){
				this.contrast(5).render();
			});
		} else if(e.target.classList.contains('contrast-remove')) {
			Caman('#canvas', img, function(){
				this.contrast(-5).render();
			});
		} else if(e.target.classList.contains('saturations-add')) {
			Caman('#canvas', img, function(){
				this.saturation(5).render();
			});
		} else if(e.target.classList.contains('saturations-remove')) {
			Caman('#canvas', img, function(){
				this.saturation(-5).render();
			});
		} else if(e.target.classList.contains('vibrance-add')) {
			Caman('#canvas', img, function(){
				this.vibrance(5).render();
			});
		} else if(e.target.classList.contains('vibrance-remove')) {
			Caman('#canvas', img, function(){
				this.vibrance(-5).render();
			});
		} else if(e.target.classList.contains('vintage-add')) {
			Caman('#canvas', img, function(){
				this.vintage().render();
			});
		} else if(e.target.classList.contains('lomo-add')) {
			Caman('#canvas', img, function(){
				this.lomo().render();
			});
		} else if(e.target.classList.contains('clarity-add')) {
			Caman('#canvas', img, function(){
				this.clarity().render();
			});
		} else if(e.target.classList.contains('sincity-add')) {
			Caman('#canvas', img, function(){
				this.sinCity().render();
			});
		} else if(e.target.classList.contains('crossprocess-add')) {
			Caman('#canvas', img, function(){
				this.crossProcess().render();
			});
		} else if(e.target.classList.contains('pinhole-add')) {
			Caman('#canvas', img, function(){
				this.pinhole().render();
			});
		} else if(e.target.classList.contains('nostalgia-add')) {
			Caman('#canvas', img, function(){
				this.nostalgia().render();
			});
		} else if(e.target.classList.contains('hermajesty-add')) {
			Caman('#canvas', img, function(){
				this.herMajesty().render();
			});
		}
	}
});

//revert filters
revertBtn.addEventListener('click', (e) => {
	Caman('#canvas', img, function(){
		this.revert();
	});
});
//drag & drop functionality
document.querySelectorAll(".dropzone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop__zone");

    inputElement.addEventListener("change", e => {
        if (inputElement.files.length){
            updateCanvas(dropZoneElement, inputElement.files[0]);
        }
    });

    //for drag & drop upload
    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();

        if (e.dataTransfer.files.length){
            inputElement.files = e.dataTransfer.files;
            updateCanvas(dropZoneElement, e.dataTransfer.files[0]);
        }

    });
});

/*
* Writting the function for updating the tumbnail on a drop zone element
* @param {html elemenet} dropZoneElement
* @param {file} file
*/

function updateCanvas(dropZoneElement, file){
    let canvasElement = dropZoneElement.querySelector("#canvas");
	const reader = new FileReader();
    if (file.type.startsWith("image/")){
        fileName = file.name;
		reader.readAsDataURL(file);
    } else {
        canvasElement.style.backgroundImage = `url('./images/noimage.jpg')`;
	}
	reader.addEventListener('load', ()=>{
		//create image
		img = new Image();
		//set image sourc
		img.src = reader.result;
		//on image load add to canvas
		img.onload = function(){
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, img.width, img.height);
			canvas.removeAttribute('data-caman-id');
		}
	}, false);
}
//upload file
uploadFile.addEventListener('change', (e) => {
	//get file
	const file = document.getElementById('upload-file').files[0];
	//init filereader
	const reader = new FileReader();
	if(file.type.startsWith("image/")){
		//set filename
		fileName = file.name;
		reader.readAsDataURL(file);
	} else {
		canvasElement.style.backgroundImage = `url('./images/noimage.jpg')`;
	}
	// add image to the canvas
	reader.addEventListener('load', ()=>{
		//create image
		img = new Image();
		//set image sourc
		img.src = reader.result;
		//on image load add to canvas
		img.onload = function(){
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, img.width, img.height);
			canvas.removeAttribute('data-caman-id');
		}
	}, false);
});

// download image events
downloadBtn.addEventListener('click', (e) => {
	//get the file extension
	const fileExtension = fileName.slice(-4); // -4 is for getting the file extension in the var

	// initialize new file name var
	let newFileName;

	//check image type
	if(fileExtension === '.jpg' || fileExtension === '.png'){
		newFileName = fileName.substring(0, fileName.length - 4)+'_edited.jpg';
	}

	//calling download 
	download(canvas, newFileName);
});

//download function
function download(canvas, newFileName) {
	let e;
	// create download link
	const link = document.createElement('a');
	// set props
	link.download = newFileName;
	link.href = canvas.toDataURL('image/jpeg', 0.8);

	e = new MouseEvent('click');
	link.dispatchEvent(e);
}