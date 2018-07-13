class Carousel {
  constructor(element) {
    this.element = element;
    this.images = this.element.querySelectorAll(".image");
    console.log(this.images)
    this.images = Array.from(this.images).map( image => {
      return new Image(image, this);
    });
    this.buttons = this.element.querySelectorAll("button");
    this.buttons = Array.from(this.buttons).map( button => {
      return new Button(button, this);
    });
    this.currentImage = this.images[0];
    
    this.init()
  }

  init() {
    this.currentImage.select();
  }

  decreaseIndex() {
    this.i = this.images.indexOf(this.currentImage)
    if (this.i > 0) {
      this.updateActive(this.images[this.i+1])
    } else {
      this.updateActive(this.images[this.images.length-1])
    }
  }

  increaseIndex() {
    this.i = this.images.indexOf(this.currentImage)
    if (this.i < this.images.length-1) {
      this.updateActive(this.images[this.i+1])
    } else {
      this.updateActive(this.images[0])
    }
  }

  updateActive(newActive) {
    this.currentImage.deselect();
    this.currentImage = newActive;
    this.currentImage.select()
  }

  getTab(data) {
    return data;
  }
}

class Image {
  constructor(element) {
    this.element = element;
  }

  select() {
    this.element.classList.remove("image");
  }

  deselect() {
    this.element.classList.add("image");
  }
}

class Button {
  constructor(button, parent) {
    this.button = button;
    this.carousel = parent;
    this.direction = parent.getTab(this.button.dataset.tag);

    this.button.addEventListener('click', () => {
      if (this.direction === 0) {
        this.carousel.decreaseIndex()
      } else {
        this.carousel.increaseIndex()
      }
    })
  }
}

let carousel = document.querySelectorAll(".image-carousel");
carousel = Array.from(carousel).map(car => new Carousel(car));