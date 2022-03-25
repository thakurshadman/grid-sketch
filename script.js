const gridCount = 20;
var id = 0;
let mouseDown = false;

const parent = document.getElementById('parent'); //-----------------------------------Flex Container
parent.style.display = 'flex';
parent.style.flexDirection = 'column';
parent.style.alignItems = 'center';

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
gridContainer.addEventListener('mousedown', () => {
    mouseDown = true;
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
    gridChild.addEventListener('mouseover', (e) => {
        if(mouseDown){
            gridChild.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        }
    })
    gridContainer.append(gridChild);
}

parent.append(gridContainer);