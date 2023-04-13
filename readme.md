A simple image gallery overlay which should work an any blog without needing to change anything else.

## Overview & Usage

![image](https://user-images.githubusercontent.com/35309884/231178597-38336a2a-e67c-4d76-8654-03b6cd542a66.png)
The overlay is fullscreen and shows one image at a time. The controlls are:
- Button at the top and bottom to quit, or press `Escape` or `q`
- Button on the left side `Arrow left` or `a` to go to the previous image
- Button on the right side `Arrow right` or `d` to go to the next image

It also is assumed, that the `img_filter`, which can be set at the top of the JavaScript finds all `<img>` tags which should be included.
Additionally, each `<img>` tag should be contained in a single container. Because this copies the content of the parent to work properly with images that have a `<source>` tag.

A typical image I want to include looks something like this in HTML:
```html
<picture class="picture-wrapper">
  <source srcset="/images/image_500x0_resize_q90_box.jpg 500w, /images/image_800x0_resize_q90_box.jpg 800w" type="image/jpeg">
  <source srcset="/images/image_500x0_resize_q90_h2_box.webp 500w, /images/image_800x0_resize_q90_h2_box.webp 800w" type="image/webp">
  <img loading="lazy" src="/images/image_1500x0_resize_q90_box.jpg" class="figure-img img-fluid gallery-img-fluid" alt="alt" width="1500" height="1125">
</picture>
```
And I also have this css:
```css
.gallery-img-fluid {
    object-fit: contain;
    width: 100%;
    height: 100%;
}
```

I wrote this for Hugo with [hugo-responsive-images](https://github.com/future-wd/hugo-responsive-images). This module is automatically installed as a sub-module.

## Installation (as a Hugo Module)

You must initialize your project for hugo modules using the command

```YAML
hugo mod init github.com/user/project
```

Then add this module to your projects configuration

```YAML
# config.yaml
module:
  imports:
  - path: github.com/future-wd/temp-image-gallery
```

Then you need to install the module with 

```
hugo mod get
```

## Prerequisites

- The latest GoLang (minimum 1.16). See <https://golang.org/dl/>.
- The lates git for downloading the module. See <https://git-scm.com/downloads/>.
- Install the latest hugo (at least 0.101.0)
- You hugo project must be initialized for hugo modules e.g. `hugo mod init github.com/username/project` in the root of your project.
- Update your modules with `hugo mod get -u`

## Importing CSS and JS

```SCSS
// SCSS import
@import "/simple-image-gallery/styles/main.scss";
```

```js
// JS import
import 'simple-image-gallery/js/index.js';
