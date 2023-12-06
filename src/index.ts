const sample_event_data: EventItem[] = [
  {
    id: 1,
    title: "Summer Party",
    date: "7th July 2023",
    time: "15:00"
  },
  {
    id: 2, // Unique ID
    title: "Christmas Party",
    date: "18th Dec 2023",
    time: "19:00"
  },
  {
    id: 3, // Unique ID
    title: "Half Marathon",
    date: "15th Sept 2024",
    time: "13:00"
  }
];

type ClickTouchEvent = MouseEvent | TouchEvent;

type EventItem = {
  id: number;
  title: string;
  date: string;
  time: string;
};

const $dropdown = document.getElementById('dropdown') as HTMLElement;
const $dropdown_header = document.querySelector('.dropdown__header') as HTMLElement;
const $dropdown__list = document.querySelector('.dropdown__list') as HTMLElement;

function handleDropdownToggle(e: ClickTouchEvent) {
  $dropdown?.classList.toggle('active');
}

function handleDropdownItem(e: ClickTouchEvent) {
  const target = e.target as HTMLElement;

  if (target && target.classList.contains('dropdown__item')) {
    target.classList.toggle('dropdown__item--selected');
  }
}

function loadEvents(events: EventItem[]) {
  if (events.length === 0) return;

  events.forEach((event) => {
    const listItem = document.createElement('li');
    listItem.className = 'dropdown__item';
    listItem.innerHTML = `<strong>${event.title}</strong> - ${event.time}, ${event.date}`;
    $dropdown__list.appendChild(listItem);
  });
}

$dropdown_header?.addEventListener('click', handleDropdownToggle);
$dropdown__list?.addEventListener('click', handleDropdownItem);

loadEvents(sample_event_data);
