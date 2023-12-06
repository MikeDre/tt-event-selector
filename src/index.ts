type ClickTouchEvent = MouseEvent | TouchEvent;

const $dropdown = document.getElementById('dropdown') as HTMLElement;
const $dropdown_header = document.querySelector('.dropdown__header') as HTMLElement;

const handleDropdown = (e: ClickTouchEvent) => {
  $dropdown?.classList.toggle('active');
};

$dropdown_header?.addEventListener('click', handleDropdown);
