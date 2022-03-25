const gridCount = 16;
var id = 0;

const parent = document.getElementById('parent');


const gridContainer = document.createElement('div');
gridContainer.className = 'gridContainer';
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;



for ( ; id<(gridCount*gridCount); id++){
    const gridChild = document.createElement('div');
    gridChild.className = 'gridChild';
    gridChild.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    gridChild.style.aspectRatio = '1';
    gridChild.id = id.toString();
    gridContainer.append(gridChild);
}

parent.append(gridContainer);
