const gridCount = 100;
var id = 0;
let mouseDown = false;

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
gridContainer.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;
gridContainer.style.width = '400px';
gridContainer.style.userSelect = 'none';
gridContainer.addEventListener('mousedown', (e) => {
    mouseDown = true;
    if (e.target.className == 'gridChild'){
        console.log(e.target);
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }
})
gridContainer.addEventListener('mouseup', () => {
    mouseDown = false;
    
  })

for (; id < (gridCount * gridCount); id++) { //------------------------------------------------Grid Children
    const gridChild = document.createElement('div');
    gridChild.className = 'gridChild';
    gridChild.style.backgroundColor = `white`;
    gridChild.style.aspectRatio = '1';
    gridChild.id = id.toString();
    gridChild.addEventListener('mouseover', () => {
        if(mouseDown){
            gridChild.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        }
    })
    gridContainer.append(gridChild);
}

parent.append(gridContainer);
body.append(parent);
