let modes = {'Default':true, 'Color':false, 'Rainbow':false, 'Eraser':false};
let mouseDown = false;
const defaultGrid = 50;
var gridCount = defaultGrid; 

const body = document.body; //----------------------------------------------body
body.style.display = 'flex';
body.style.alignItems ='center';
body.style.justifyContent = 'space-evenly';
body.style.padding = '0px';
body.style.margin = '0px';
body.style.boxSizing = 'border-box';
body.style.height = '100vh';

const btnGroup = document.createElement('div'); //--------------------------buttons container
btnGroup.style.display = 'flex';
btnGroup.style.flexDirection = 'column';
btnGroup.style.gap = '1.5rem';

const colorBtn = document.createElement('input');//--------------------------colorBtn
colorBtn.setAttribute('type','color');
stylizeButton(colorBtn);
colorBtn.style.padding = '0';
colorBtn.style.height = '42px';

colorBtn.oninput = function(){
    Object.keys(modes).forEach(mode => modes[mode] = false);
    modes['Color'] = true;
}
btnGroup.append(colorBtn);


const buttonLabels = ['Rainbow', 'Eraser'];//----------------Rainbow, Eraser, buttons
buttonLabels.forEach((button)=>{
    const btn = document.createElement('button');
    btn.textContent = `${button}`;
    stylizeButton(btn);
    btn.addEventListener('click',()=>{
        Object.keys(modes).forEach(mode => modes[mode] = false);
        modes[btn.textContent] = true;
    })
    btnGroup.append(btn);
})
const clrBtn = document.createElement('button'); //--------------------------clear button
stylizeButton(clrBtn);
clrBtn.textContent = 'Clear';
clrBtn.addEventListener('click',()=>{
    gridChildren = document.querySelectorAll('.gridChild')
    gridChildren.forEach(gridChild => {
        gridChild.style.backgroundColor = 'white';        
    });
})

btnGroup.append(clrBtn);


const sliderContainer = document.createElement('div'); //------------------------------Slider Container
sliderContainer.style.display = 'flex'
sliderContainer.style.flexDirection = 'column';
sliderContainer.style.alignItems = 'center';

const sliderLabel = document.createElement('p');//------------------------SliderLabel: 50 x 50
sliderLabel.textContent = '50 x 50'
sliderContainer.append(sliderLabel);

const slider = document.createElement('input');//--------------------------Slider
slider.setAttribute('type','range');
slider.setAttribute('min','1');
slider.setAttribute('max', '100');
slider.setAttribute('value','50');
slider.style.accentColor = 'black';
slider.style.width = '20rem';

slider.oninput = function() {//--------------------------Slider input function
    sliderLabel.textContent = this.value + ' x ' + this.value;
    gridCount = Number(this.value);
    removeGridChildren();
    buildGrid(gridCount);
} 

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

const gridContainer = document.createElement('div'); //------------------------------------Grid Container
gridContainer.className = 'gridContainer';
gridContainer.style.display = 'grid';
gridContainer.style.border = '5px solid black';
gridContainer.style.width = '500px';
gridContainer.style.userSelect = 'none';

gridContainer.addEventListener('mousedown', (e) => {//------------------------------------Grid Events
    mouseDown = true;
    if (e.target.className == 'gridChild'){
        e.target.style.backgroundColor = backgroundColor(modes);
    }
})
gridContainer.addEventListener('mouseup', () => {
    mouseDown = false;
  })

buildGrid(gridCount);
parent.append(gridContainer);
body.append(parent);


function backgroundColor(modes){ //---------------------------------------color to show on grid children on mouse actions
    if (modes['Default']){
        return 'black';
    }
    else if (modes['Rainbow']){
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }
    else if (modes['Eraser']){
        return 'white';
    }
    else if (modes['Color']){
        return colorBtn.value;
    }
}


function buildGrid(gridCount){ //------------------------------------------------build & append Grid children
    gridContainer.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;
    for (var i = 0; i < (gridCount * gridCount); i++) { 
        const gridChild = document.createElement('div');
        gridChild.className = 'gridChild';
        gridChild.style.position = 'relative';
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

function removeGridChildren(){ //-------------------------------------------remove children before creating new n x n grid
    while(gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function stylizeButton(btn){ //---------------------------styling buttons in btnGRoup
    btn.style.padding = '10px';
    btn.style.width = '20rem';
    btn.style.border = '3px solid black';
}