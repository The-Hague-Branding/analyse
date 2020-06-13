/* ------ IMAGES DISPLAY START ------ */


function displayImages() {

  var x = document.getElementById("images-grid");
if (x.style.display ==  "none" || x.style.display ==  "") {
    x.style.display = "block";
    var e = document.getElementsByClassName("image-toggle"); 
    e.classList.toggle("active");
  } else {
    x.style.display = "none";
  }
} 		
	

/* ------ SIDEBAR ITEMS START ------ */
/**
	This is a programmatic way of creating the sidebar items on
  the left so they all are created the same way and have no
  properties missing. The title is rendered as innerText,
  the tag type is specified by 'sidebarElementType'. Make sure
  this type is also defined in your css otherwise the styling
  won't work when the items are active.
  s
  The 'createSideBarItems' just loops over the sideBarItems array
  and creates the items using javascript.
*/

var sidebarElementType = 'h4';

var sidebarItems = [  {
  title: 'students ',
  tag: 'students',
  count: 64,
},  {
  title: 'investors',
  tag:'investors',
  count: 143,
}, {
  title: 'young professional ',
  tag: 'young-prof',
  count: 100,
},{
  title: 'events',
  tag:'events',
  count: 55,
}, {
  title:'business',
  tag:'business',
  count: 99,
}, {
  title: 'tourists',
  tag:'tourists',
  count:125,
}, {
  title: 'social and day care workers',
  tag: 'care',
  count:0,
},{
  title: 'educational staff',
  tag: 'edu',
  count:0,
},{
  title: 'public transport workers',
  tag: 'transport',
  count:0,
},{
  title: 'food supply workers',
  tag: 'food',
  count:0,
},{
  title: 'logistical professions',
  tag: 'logistic',
  count:0,
},{
  title: 'waste collectors',
  tag: 'waste',
  count:0,
},{
  title: 'media broadcasters',
  tag: 'media',
  count:0,
},{
  title: 'emergency service workers',
  tag: 'emergency',
  count:0,
},{
  title: 'central government workers ',
  tag: 'gov',
  count:0,
}
];

function createSideBarItems() {
    const sidebarSelector = document.querySelector('div.sidebar .items');
    sidebarItems.forEach((item) => {
    const newElement = document.createElement(sidebarElementType);
    newElement.setAttribute('data-tag', item.tag);
    newElement.classList.add('clickable-tag');
    newElement.innerText = item.title
    sidebarSelector.appendChild(newElement);
  });
}

/* ------ SIDEBAR ITEMS END ------ */

					/* ------ OVERLAY TEXT STARTS ------ */


					function on() {
					  document.getElementById("overlay-box").style.display = "block";
					}

					function off() {
					  document.getElementById("overlay-box").style.display = "none";
					} 



/** ------ START: SIDEBAR CATEGORY HANDLERS ----- */

/* 
	Handles toggling of the category in the main text. First it will
  find all the existing active items and deactivate them, then it
  will only add the active class to the items of the newly selected
  category. This only will be activated if the clicked item on the
  left is in an active state (e.g. if the item was active and you
  click it again it will deactivate all the items along with itself)
*/
function toggleCategoryItem(className, isActive) {
  // remove all others
  document.querySelectorAll('.main span.active').forEach(el => {
    el.classList.remove('active');
  });

  document.querySelector('.main').classList.remove('has-active-category');

  // add active class if is activated
  if (isActive) {
    document.querySelector('.main').classList.add('has-active-category');
    document.querySelectorAll(`.main .${className}`).forEach(el => {
      el.classList.add('active');
    });
  }
}

/**
	This will find the counter element in the main text, and will
  find the provided category information based on the tag in the
  first argument when this function is called. First it will
  remove the active class (for the toggling effect), and then add
  it back again if there is a category active currently with the
  count of the active category set as innertext.
  
  Next it will find the non-addressed-overlay item, and will toggle
  this on if the newly found category has a count of 0.
*/
function adjustCount(item, isActive) {
  const counterEl = document.querySelector('.main .counter');
  counterEl.classList.remove('active');
  // find selected item by tag id, if found then update counter;
  const selectedItem = sidebarItems.find(i => i.tag === item);
  if (selectedItem) {
    counterEl.innerText = `Count: ${selectedItem.count}`;
  }

  const overlayEl = document.querySelector('.non-addressed-overlay');
  overlayEl.classList.remove('active');

  if (isActive) {
    counterEl.classList.add('active');

    if (selectedItem && selectedItem.count === 0) {
      overlayEl.classList.add('active');
    }
  }
}

/**
	This creates events listeners for the category toggles on the left.
  First it will find all the available items, and deactivate the
  existing category (if there was one). Afterwards it will toggle
  into the new [in]active state, and will also trigger the activation
  of items in the main text and update the count element in the main
  text.
*/
function createCategoryToggleListeners() {
  const tagSelectors = `${sidebarElementType}.clickable-tag`;
  document.querySelectorAll(tagSelectors).forEach(el => {

    el.addEventListener('click', function() {
      /** Remove all existing active for siblings classes */
      document.querySelectorAll(tagSelectors).forEach(item => {
        if (item.dataset.tag !== el.dataset.tag) {
          item.classList.remove('active');
        }
      });

      el.classList.toggle('active');
      const isActive = !!el.classList.contains('active');
      toggleCategoryItem(`${el.dataset.tag}-item`, isActive);
      adjustCount(el.dataset.tag, isActive);
    });
  });
}

/** ------ END: SIDEBAR CATEGORY HANDLERS ----- */

/** ------ START: SIDEBAR KEY/LANGUAGE TOGGLE HANDLERS ----- */

/**
	This code will basically activate the toggles on the left and add
  the active class, and will do the same with the corresponding
  items in the main text. in this case key highlights with have the
  <span class="ti-key-high"> ... </span> tag surrounding it. Same
  applies for the language tages, however with 'ti-lang-tone' and
	'ti-lang-strat' attached to it.
*/

const toggleClasses = ['key-high', 'lang-tone', 'lang-strat', 'new-image'];

function activateToggle(toggleName) {
  const indicatorEl = document.querySelector(`.${toggleName}-indicator`);
  indicatorEl.classList.toggle('active');
  document.querySelector('.main').classList.toggle('has-active-toggle');

  document.querySelectorAll(`span.ti-${toggleName}`).forEach(el => {
    el.classList.toggle(`ti-${toggleName}-active`)
  });
}

function addToggleEventListeners() {
  // create event listeners for the toggles in the sidebar
  toggleClasses.forEach(item => {
    const element = document.querySelector(`.toggle-${item}`);
    if (element) {
      element.addEventListener('click', function() {
        activateToggle(item);
      })
    }
  });
}

/** ------ END: SIDEBAR KEY/LANGUAGE TOGGLE HANDLERS ----- */

/**
	This section makes sure the javascript code defined above
  is executed after the page finishes loading.
  
  - First we create the sidebaritems
  - Then we add click listeners for these items
  - Finally we add click event listeners for the language/key toggles
*/
document.addEventListener('DOMContentLoaded', function() {
  // create the items in the sidebar
  createSideBarItems();

  createCategoryToggleListeners();
  addToggleEventListeners();

});

