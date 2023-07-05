console.log("Loaded keyboard.js")
// Keyboard function from PixiJS tutorial
function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };
    
    return key;
}


// Setup keyboard interactions
let upKey = keyboard("ArrowUp");
let downKey = keyboard("ArrowDown");
let leftKey = keyboard("ArrowLeft");
let rightKey = keyboard("ArrowRight");
let tabKey = keyboard("Tab");
let escapeKey = keyboard("Escape");
let deleteKey = keyboard("Delete");
let backspaceKey = keyboard("Backspace");
let Key1 = keyboard("1");
let Key2 = keyboard("2");
let Key3 = keyboard("3");
let Key4 = keyboard("4");
let lshiftKey = keyboard("Shift");

upKey.press = ()  => {
    director.addRoads('N');
};
downKey.press = ()  => {
    director.addRoads('S');
};
leftKey.press = ()  => {
    director.addRoads('W');
};
rightKey.press = ()  => {
    director.addRoads('E');
};

tabKey.press = () => {
    director.cycleColor();
}

escapeKey.press = () => {
    if (director.activeBlock == null) {
        director.removeActiveButton();
    }
    else {
        director.removeActiveBlock();
    }
}

deleteKey.press = () => {
    if (director.activeBlock != null) {
        director.clearActiveBlock();
    }
}

backspaceKey.press = () => {
    if (director.activeBlock != null) {
        director.clearActiveBlock();
    }
}

Key1.press = () => {
    if (director.activeBlock != null) {
        director.updateColor("Resident");
    }
}

Key2.press = () => {
    if (director.activeBlock != null) {
        director.updateColor("Park");
    }
}

Key3.press = () => {
    if (director.activeBlock != null) {
        director.updateColor("Commercial");
    }
}

Key4.press = () => {
    if (director.activeBlock != null) {
        director.updateColor("Industry");
    }
}

lshiftKey.press = () => {
    let drawRoads = document.getElementById("drawRoads");
    drawRoads.checked = !drawRoads.checked; 
}