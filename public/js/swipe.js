const container = document.querySelector('.slider');
const container_width = container.clientWidth;
const imgs_wrapper = document.querySelector('.slider__wrapper');
const imgs = document.querySelectorAll('.slide');
const total_imgs = imgs.length;
let current_index = 0;
let pointer_is_down = false;
let [start_x, end_x] = [0, 0];
let move_distance = 0;

function init() {
   imgs_wrapper.style.width = `${container_width * total_imgs}px`;
}

// Mousemove and Touchmove Event
function createDraggingEffects() {
   const max_distance = 2;
   const scrolled_distance = (current_index * container_width) + (start_x - end_x) / max_distance;

   switchImages(-scrolled_distance);
}

// Mouseup and Touchend Event
function calculateFinalMoveDistance() {
   const scrolled_distance = Math.abs(start_x - end_x);
   const minimum_distance = 30;

   if (scrolled_distance < minimum_distance) {
      move_distance = -(current_index * container_width);
      switchImages();
      return false;
   }

   if (start_x > end_x & current_index < total_imgs - 1) { // scroll next
      current_index++;
   } else if (start_x < end_x && current_index > 0) { // scroll prev
      current_index--;
   }

   move_distance = -(current_index * container_width);
   switchImages(move_distance);
}

// Switch Images
function switchImages(scrolled_number) {
   const distance = scrolled_number || move_distance;

   imgs_wrapper.style.transform = `translateX(${distance}px)`;
}

// Mouseleave event
function handleMouseLeave(e) {
   if (!pointer_is_down) return false;

   pointer_is_down = false;
   [start_x, end_x] = [0, 0];
   switchImages();
}

init();

container.addEventListener('mousedown', (e) => {
   e.preventDefault();
   pointer_is_down = true;
   start_x = e.pageX;
});

container.addEventListener('mousemove', (e) => {
   e.preventDefault();
   if (!pointer_is_down) return false;
   end_x = e.pageX;
   createDraggingEffects();
});

container.addEventListener('mouseup', (e) => {
   e.preventDefault();
   pointer_is_down = false;
   calculateFinalMoveDistance();
});

container.addEventListener('mouseleave', handleMouseLeave);

container.addEventListener('touchstart', (e) => {
   pointer_is_down = true;
   start_x = e.touches[0].pageX;
});

container.addEventListener('touchmove', (e) => {
   if (!pointer_is_down) return false;
   end_x = e.touches[0].pageX;
   createDraggingEffects();
});

container.addEventListener('touchend', (e) => {
   pointer_is_down = false;
   calculateFinalMoveDistance();
});
