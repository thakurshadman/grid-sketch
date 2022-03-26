let modes = {'Default':false, 'Color':false, 'Rainbow':true, 'Eraser':false};
let mouseDown = false;
const defultGrid = 16;
var gridCount = defultGrid; 

const body = document.body; //----------------------------------------------body
body.style.display = 'flex';
body.style.alignItems ='center';
body.style.justifyContent = 'space-evenly';
body.style.padding = '0px';
body.style.margin = '0px';
body.style.boxSizing = 'border-box';
body.style.height = '100vh';

const btnGroup = document.createElement('div'); //--------------------------Buttons
btnGroup.style.display = 'flex';
btnGroup.style.flexDirection = 'column';
btnGroup.style.gap = '1.5rem';

const buttons = ['Color', 'Rainbow', 'Eraser', 'Glow', 'Clear' ]
buttons.forEach((button)=>{
    const btn = document.createElement('button');
    btn.className = `btn ${button}`;
    btn.textContent = `${button}`;
    btn.style.padding = '10px';
    btn.style.width = '20rem'
    btn.style.border = '3px solid black'
    btnGroup.append(btn);
})

const sliderContainer = document.createElement('div'); //------------------------------Slider
sliderContainer.style.display = 'flex'
sliderContainer.style.flexDirection = 'column';
sliderContainer.style.alignItems = 'center';

const sliderLabel = document.createElement('p');
sliderLabel.textContent = '1 x 1'
sliderContainer.append(sliderLabel);

const slider = document.createElement('input');
slider.setAttribute('type','range');
slider.setAttribute('min','1');
slider.setAttribute('max', '100');
slider.setAttribute('value','50');
slider.style.accentColor = 'black';
slider.style.width = '20rem';


console.log(gridCount);
sliderContainer.append(slider);
btnGroup.append(sliderContainer);
body.append(btnGroup);


const parent = document.createElement('div'); //-----------------------------------Flex Container for grid and title
parent.style.display = 'flex';
parent.style.flexDirection = 'column';
parent.style.alignItems = 'center';
parent.style.gap = '20px';


const title = document.createElement('header'); //-----------------------------------------Title
title.innerText = "Etch - A - Sketch";
title.style.fontSize = '3em';
parent.append(title);

const gridContainer = document.createElement('div'); //------------------------------------Grid
gridContainer.className = 'gridContainer';
gridContainer.style.display = 'grid';
gridContainer.style.border = '5px solid black';
gridContainer.style.width = '400px';
gridContainer.style.userSelect = 'none';
gridContainer.addEventListener('mousedown', (e) => {
    mouseDown = true;
    if (e.target.className == 'gridChild'){
        console.log(e.target);
        e.target.style.backgroundColor = backgroundColor(modes);
    }
})
gridContainer.addEventListener('mouseup', () => {
    mouseDown = false;
    
  })
buildGrid(gridCount);

parent.append(gridContainer);
body.append(parent);


function backgroundColor(modes){
    if (modes['Default']){
        return 'black';
    }
    else if (modes['Rainbow']){
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }
    else if (modes['Eraser']){
        return 'white'
    }
}

slider.oninput = function() {
    sliderLabel.textContent = this.value + ' x ' + this.value;
    gridCount = Number(this.value);
    removeGridChildren();
    buildGrid(gridCount);
} 

function buildGrid(gridCount){
    gridContainer.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;
    for (var i = 0; i < (gridCount * gridCount); i++) { //------------------------------------------------Grid Children
        const gridChild = document.createElement('div');
        gridChild.className = 'gridChild';
        gridChild.style.backgroundColor = `white`;
        gridChild.style.aspectRatio = '1';
        gridChild.i = i.toString();
        gridChild.addEventListener('mouseover', () => {
            if(mouseDown){
                gridChild.style.backgroundColor = backgroundColor(modes); 
            }
        })
        gridContainer.append(gridChild);
    }
}

function removeGridChildren(){
    while(gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}