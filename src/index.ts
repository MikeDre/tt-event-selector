const sample_event_data: EventItem[] = [
  {
    id: 1,
    title: "Summer Party",
    date: "7th July 2023",
    time: "15:00"
  },
  {
    id: 2,
    title: "Christmas Party",
    date: "18th December 2023",
    time: "19:00"
  },
  {
    id: 3,
    title: "New Years Party",
    date: "31st December 2023",
    time: "00:00"
  },
  {
    id: 4,
    title: "Rock Concert",
    date: "7th January 2024",
    time: "20:00"
  },
  {
    id: 5,
    title: "Pilates Class",
    date: "10th January 2024",
    time: "19:00"
  },
  {
    id: 6,
    title: "Cooking Class",
    date: "15th January 2024",
    time: "13:30"
  }
];

const placeholder_img = 'https://asset.brandfetch.io/idQsEE3RYo/idlTUPeODS.jpeg';

type ClickTouchEvent = MouseEvent | TouchEvent;

type EventItem = {
  id: number;
  title: string;
  date: string;
  time: string;
};

const $dropdown = document.getElementById('dropdown') as HTMLElement;
const $dropdown_header = document.querySelector('.dropdown__header') as HTMLElement;
const $dropdown_list = document.querySelector('.dropdown__list') as HTMLElement;
const $dropdown_selection_overview = document.querySelector('.dropdown__selection-overview') as HTMLElement;
const $dropdown_submit_btn = document.querySelector('.dropdown__selection-submit') as HTMLElement;
const $addtional_features_toggle = document.querySelector('.addtional_features') as HTMLElement;
const $addtional_features = document.querySelector('.dropdwn__extra-features') as HTMLElement;

function handleDropdownToggle(e: ClickTouchEvent) {
  $dropdown?.classList.toggle('active');
}

function setSubmitDisabled(disabled: boolean) {

  if (disabled) {
    $dropdown_submit_btn.setAttribute("disabled", "");
  } else {
    $dropdown_submit_btn.removeAttribute("disabled");
  }
}

function selectDropdownItem(e: ClickTouchEvent) {
  const target = e.target as HTMLElement;

  if (target && target.classList.contains('dropdown__item')) {
    target.classList.toggle('dropdown__item--selected');
    updateSelectedItems();
  }
}

function updateSelectedItems() {
  const totalSelectedItems = getSelectedTotalItems();

  setSubmitDisabled(false);
  
  if (totalSelectedItems > 1) {
    $dropdown_selection_overview.innerHTML = `${totalSelectedItems} events selected`;
  } else if (totalSelectedItems === 1) {
    $dropdown_selection_overview.innerHTML = `${totalSelectedItems} event selected`;
  } else {
    $dropdown_selection_overview.innerHTML = 'No selected events';
    setSubmitDisabled(true);
  }
}

function getSelectedTotalItems() {
  const $selectedItems = $dropdown_list.querySelectorAll('.dropdown__item--selected');
  
  return $selectedItems.length;
}

function submitSelectedEvents() {
  const totalSelectedItems = getSelectedTotalItems();

  if (totalSelectedItems === 0) {
    alert('Please select an event');
    return;
  }

  const $selectedItems = $dropdown_list.querySelectorAll('.dropdown__item--selected');

  let selectedEventIds: string[] = [];

  $selectedItems.forEach(($selectedItem) => {
    const eventId = $selectedItem.getAttribute('data-event-id');

    if (eventId) {
      selectedEventIds.push(eventId);
    }
  });

  alert(`Selected Events: ${selectedEventIds.join(', ')}`);
}

function loadEvents(events: EventItem[]) {
  if (events.length === 0) return;

  events.forEach((event) => {
    const eventItem = document.createElement('li');
    eventItem.className = 'dropdown__item';
    eventItem.setAttribute('data-event-id', event.id.toString());
    eventItem.innerHTML = `
      <img class="dropdown__item-img" src="${placeholder_img}" alt="event-${event.title}" />
      <span class="dropdown__item-meta">
        <strong class="dropdown__item-title">${event.title}</strong>
        <span class="dropdown__item-date"> ${event.time}, ${event.date}</span>
      </span>
    `;
    $dropdown_list.appendChild(eventItem);
  });

  const $dropdown_items = document.querySelectorAll('.dropdown__list li') as NodeListOf<HTMLElement>;

  if ($dropdown_items.length !== 0) {
    $dropdown_items.forEach(($dropdown_item) => {
      $dropdown_item.addEventListener('click', selectDropdownItem);
    });
  }

  updateSelectedItems();
}

function showAddtionalFeatures() {
  $addtional_features?.classList.toggle('active');
}

$dropdown_header?.addEventListener('click', handleDropdownToggle);
$dropdown_submit_btn?.addEventListener('click', submitSelectedEvents);
$addtional_features_toggle?.addEventListener('click', showAddtionalFeatures);

loadEvents(sample_event_data);
