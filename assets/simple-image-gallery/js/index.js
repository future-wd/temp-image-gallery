// MIT License

// Copyright (c) 2023 Johannes Bier

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const img_filter = ".img-fluid"

let current_slide = 0;
let keydown = null

function closeOverlay() {
    document.querySelectorAll(".overlay").forEach(e => e.remove());

    // activate scrolling
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";

    // restore old function
    document.onkeydown = keydown
}

function createOverlay(e) {
    // disable scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no"; 

    // create overlay
    let fragment = document.createDocumentFragment();
    
    let background_layer = document.createElement("div");
    background_layer.classList.add("overlay")
    background_layer.classList.add('overlay-background');
    fragment.appendChild(background_layer);

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.classList.add('overlay-content');

    let content = '<div class="gallery-wrapper"><button class="gallery-control-prev" title="Previous (Left arrow key)"><span class="prev-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="#008000ff" viewBox="0 0 8 8"><path d="M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z" /></svg></span></button><button class="gallery-control-close top"><span>×</span></button><div class="gallery"><div id="gallery-id" class="gallery-inner">';
    
    let images = document.querySelectorAll(img_filter);
    images.forEach((i, n) => {
        if (e.target === i) {
            current_slide = n;
        }

        content += `<picture class="gallery-img-wrapper">${i.parentNode.innerHTML}</picture>`;
    });

    content += '</div></div><button class="gallery-control-close bottom"><span>×</span></button><button class="gallery-control-next" title="Next (Right arrow key)"><span class="next-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="#008000ff" viewBox="0 0 8 8"><path d="M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z" /></svg></span></button></div>';

    overlay.innerHTML = content;
    fragment.appendChild(overlay);

    document.body.insertBefore(fragment, document.body.childNodes[0]);

    let inner = document.getElementById("gallery-id");
    inner.style.width = images.length * 100 + "%"

    // find controlls
    const pB = document.querySelector(".gallery-control-prev");
    const nB = document.querySelector(".gallery-control-next");

    // close event
    document.querySelectorAll(".gallery-control-close").forEach(e => e.addEventListener('click', closeOverlay));

    // calc translation size
    const t = 100 / images.length;
    const update = (i) => {
        inner.style.transform = `translateX(${i * -t}%)`;
    }

    // set initial image
    update(current_slide);

    // button events
    function previousSlide() {
        current_slide -= 1;
        if (current_slide < 0)
            current_slide = 0;
        update(current_slide);
    }
    function nextSlide() {
        current_slide += 1;
        if (current_slide >= images.length)
            current_slide = images.length - 1;
        update(current_slide);
    }
    pB.addEventListener("click", previousSlide);
    nB.addEventListener("click", nextSlide);

    // may be incompatible with other scripts with key events
    // so we overwrite when opening an overlay
    keydown = document.onkeydown
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        let action = false;

        // close
        if ("key" in evt) {
            action = (evt.key === "Escape" || evt.key === "Esc" || evt.key === "q");
        } else {
            action = (evt.keyCode === 27 || evt.keyCode === 81);
        }
        if (action) {
            closeOverlay()
        }

        // nav right
        if ("key" in evt) {
            action = (evt.key === "ArrowRight" || evt.key === "d");
        } else {
            action = (evt.keyCode === 39 || evt.keyCode === 68) 
        }
        if (action) {
            nextSlide();
        }

        // nav left
        if ("key" in evt) {
            action = (evt.key === "ArrowLeft" || evt.key === "a");
        } else {
            action = (evt.keyCode === 37 || evt.keyCode === 65) 
        }
        if (action) {
            previousSlide();
        }
    };
}

// Add event to all images
document.querySelectorAll(img_filter).forEach(e => e.addEventListener('click', createOverlay));
