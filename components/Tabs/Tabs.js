class Tabs {
  constructor(element) {
    this.element = element;
    console.log(this.element)
    // create a reference to the ".tabs-link" class nested in your tab object
    this.links = this.element.querySelectorAll(".tabs-link");
    console.log(this.links)
    console.log(this)
    // This step will map over the array creating new TabsLink class instances of each link.  No need to update anything here, just study what is going on.  Notice that we are creating another new object using the TabsLink class.
    this.links = Array.from(this.links).map( link => {
      return new TabsLink(link, this);
    });
    console.log(this.links)
    
    // Set the active link to the first item in the array
    this.activeLink = this.links[0];
    console.log(this.activeLink)
    
    // Nothing to update here, just notice we are invoking the init() method
    this.init();
  }

  init() { 
    // invoke the method select() on activeLink
    this.activeLink.select();
  }

  updateActive(newActive) {
    console.log(newActive)
    // invoke the method deselect() on activeLink
    this.activeLink.deselect();
    // assign this.activeLink to the new active link (newActive)
    this.activeLink = newActive;
  }

  getTab(data) {
    // return a reference to the element's data attribute
    return data;
  }

}

class TabsLink {
  // notice that we passesd in the element reference as well as a reference to the parent class.
  constructor(element, parent) {
    this.element = element;
    console.log(this.element)
    // assign this.tabs to parent
    this.tabs = parent;
    console.log(this.tabs)
    // Using the method from the parent class above, pass in a reference to the custom data attribute.  
    this.tabsItem = parent.getTab(this.element.dataset.tab);
    console.log(this.tabsItem)
    // Create a new TabsItem object that passes in a tabsItem value that you just created above
    this.tabsItem = new TabsItem(document.querySelector(`.tabs-item[data-tab="${this.tabsItem}"]`));
    console.log(this.tabsItem)
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      // invoke the select() method on this
      this.select();
    });
  };

  select() {
    console.log(this.tabsItem)
    // Add a class named "tabs-link-selected" to the element
    this.element.classList.add("tabs-link-selected");
    // Notice that we are using the select method on tabsItem
    this.tabsItem.select();
  }

  deselect() {
    // Remove a class named "tabs-link-selected" from the element
    this.element.classList.remove("tabs-link-selected"); 
    // Notice that we are using the deselect method on tabsItem
    this.tabsItem.deselect();
  }
}

class TabsItem {
  constructor(element) {
    this.element = element;
    console.log(this.element)
  }

  select() {
    // Add a class named "tabs-item-selected" to the element 
    this.element.classList.add("tabs-item-selected");
  }

  deselect() {
    // Remove a class named "tabs-item-selected" from the element 
    this.element.classList.remove("tabs-item-selected");
    // Congrats, you finished all the instruction, check out your tab navigator!
  }
}


// START HERE: create a reference to the ".tabs" classes
let tabs = document.querySelectorAll(".tabs");
// map through each tabs element and create a new Tabs object.  Be sure to pass in a reference to the tab when creating the Tabs object.
tabs = Array.from(tabs).map(tab => new Tabs(tab));

