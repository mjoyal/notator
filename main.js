const inputs = document.querySelectorAll(".input");
const selects = document.querySelectorAll(".drop");
const care_notes = document.querySelector("#care-notes");
const retail_notes = document.querySelector("#retail-notes");
const porting_notes = document.querySelector("#porting-notes");
const required_fields = Array.from(document.querySelectorAll(".required"));
const themes = document.querySelectorAll(".themes");
const tag = document.querySelector("#tags");
const name = document.querySelector("#name");
const number = document.querySelector("#number");
const pin = document.querySelector("#pin");
const action_boxes = document.querySelectorAll(".comment");
const copy_content = document.querySelectorAll(".copy-content");
const conversation_id = document.querySelector("#conversation-id");
const form_type_selector = document.querySelector("#form-type-selector");
const care_forms = document.querySelectorAll(".dynamic-care-form-section");
const nav_items = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const page_titles = document.querySelectorAll(".title");
const only_digital = document.querySelectorAll(".only-for-digital");
const retail_form_type_selector = document.querySelector(
  "#retail-form-type-selector"
);
const retail_forms = document.querySelectorAll(".dynamic-retail-form-section");
// Buttons
const buttons = document.querySelectorAll(".button");
const combine_button = document.querySelectorAll(".combine-button"); //ALL
const reset_button = document.querySelectorAll(".reset-button"); // ALL
const number_copy_button = document.querySelector("#number-copy-button");

const resourcesContent = {
  "Porting Number": `96477002469`,

  "Unlock Account Number": "DBC00163578453",

  "Payment Investigation Template": `• Payment Method:
• Transaction Date:
• Dollar Amount:
• Card Type (Visa, Visa Debit, Mastercard, Amex):
• Last 4 digits of the Credit Card:
• Account Number:`,

  "Unlock Code Unavailable Template": `• Device Make:
• Device Model:
• Device IMEI (Should be 15 digits):
• Follow Up Email Address:`,

  "Follow Up Shipping Tracking Template": `• Customer’ request is regarding; Cancelling Order/Missing Order/Update:
• Account Number:
• Order Number:
• Tracking Number:
• Device Make & Model:
• IMEI:`,

  "Network Reset - iPhone": `I would recommend a Network Reset. Just to let you know you will need to re-enter any saved Wi-Fi passwords after the reset.The Network Reset is done by going to Settings > General > Reset > Reset Network Settings. It may ask for a password, this is the one you use to get into your phone.`,

  "VoLTE OFF - iPhone": `Head into Settings > Cellular > Cellular Data Options > Enable LTE > Select 'Data Only' or 'VoLTE OFF'.`,

  "Network Reset - Samsung": `I would recommend a Network Reset. Just to let you know you will need to re-enter any saved Wi-Fi passwords after the reset. The Network Reset is done by going to Settings > General Management > Reset > Reset Network Settings. It may ask for a password, this is the one you use to get into your phone.`,

  "VoLTE OFF - Samsung": `Okay head into your Settings > Connections > Mobile Networks and turn off 'VoLTE Calls.'`,

  "Network Reset - Google Pixel": `I would recommend a Network Reset. Just to let you know you will need to re-enter any saved Wi-Fi passwords after the reset. To Reset your Network Settings, head into your Settings > System > Advanced > Reset Options > Reset Wi-Fi, Mobile & Bluetooth.`,

  "VoLTE OFF - Google Pixel": `Okay head into your Settings > Network & Internet > Mobile Networks and turn off 'VoLTE.`
};

/*** Copy to Clipboard Function ***/

function copy(c) {
  c.select();
  document.execCommand("copy");
}

function date(given_month) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString(); // 2:45:45 PM
  const date_string = date.toString().split(" ").splice(1, 3).join(" "); // Mar 18 2020
  return [
    time,
    date_string,
    monthNames[given_month ? given_month : month],
    year
  ];
}

function hideShow(h, s, display) {
  h.forEach((e) => (e.style.display = "none"));
  document.getElementById(s).style.display = display;
}

function validate(v) {
  for (let i = 0; i < v.length; i++) {
    if (v[i].value) {
      v[i].style.backgroundColor = "var(--main)";
    } else {
      v[i].style.backgroundColor = "red";
    }
  }
}

function onlyNumbers(e) {
  const number = e.value.replace(/[^0-9]/g, "");
  e.value = number;
}
/*** Style Select Drop Downs ***/
document.querySelectorAll(".drop").forEach((d) =>
  d.addEventListener("change", function (e) {
    e.currentTarget.style.color = "white";
  })
);

document.querySelectorAll(".number-only").forEach((i) =>
  i.addEventListener("focusout", function (e) {
    onlyNumbers(e.currentTarget);
  })
);

/************************* Care *************************/
/**** ALL COMBINE FUNCTIONS ****/

function combineCare() {
  let output = "";
  const problem = document.querySelector("#problem").value;
  const action = document.querySelector("#action").value;
  const team = !document.querySelector("#team").value
    ? `Care`
    : document.querySelector("#team").value;
  output += tag.value ? `${tag.value}\n` : ``;
  output += `Problem: ${problem}\n\nName: ${toProperCase(
    name.value
  )}\nMSISDN: ${number.value}\n${
    pin.value
  }\nTeam: ${team}\n\nAction: ${action}`;
  output += `${checkValue()}`;
  output += conversation_id.value
    ? `\n\nConversation ID: ${conversation_id.value}`
    : ``;
  //  output += forms(document.querySelectorAll('.care-items'))
  care_notes.value = output;
}

function combinePtp() {
  let output = "";
  const ptp_amount = document.querySelector("#ptp-amount").value;
  const ptp_method = document.querySelector("#ptp-method").value;
  const ptp_broken = document.querySelector("#broken-promise").value;
  const ptp_details = document.querySelector("#ptp-action").value;
  let date = new Date();
  date.setDate(date.getDate() + 7);
  date = date.toString().split(" ").splice(1, 3).join(" ");

  output += `***PROMISE TO PAY*** \n\nName: ${toProperCase(
    name.value
  )}\nMSISDN: ${number.value}\n${
    pin.value
  }\nAmount:$ ${ptp_amount}\nDue Date: ${date}
Method: ${ptp_method}\nLast Broken PTP: ${ptp_broken}\nAdditional Details: ${ptp_details}`;
  output += `\n${checkValue()}`;
  output += conversation_id.value
    ? `\nConversation ID: ${conversation_id.value}`
    : ``;
  care_notes.value = output;
}

function combineVacation() {
  let output = "";
  const months = parseInt(document.querySelector("#vacation-duration").value);
  const start_month = parseInt(document.querySelector("#start-month").value);
  const bill_cycle = document.querySelector("#bill-cycle").value;
  const vacation_details = document.querySelector("#vacation-action").value;

  output += `***VACATION SUSPEND***\nName: ${toProperCase(
    name.value
  )}\nMSISDN: ${number.value}\n ${pin.value}\n
Payment: $${months * 15}\nSuspension Start Date: ${
    date(start_month)[2]
  } ${bill_cycle} ${
    date()[3]
  }\nDuration: ${months} months(s)\nSuspension End Date: ${
    date(start_month + months)[2]
  } ${bill_cycle} ${date()[3]}\n\nAddtional Details: ${vacation_details}`;
  output += `\n${checkValue()}`;
  output += conversation_id.value
    ? `\n\nConversation ID: ${conversation_id.value}`
    : ``;
  care_notes.value = output;
}

function combineLoyalty() {
  let output = "";
  const reason = document.querySelector("#cancel-reason").value;
  const comment = document.querySelector("#loyalty-action").value;
  const month = document.querySelector("#bill-month").value;
  const cycle = document.querySelector("#final-cycle").value;
  const tab = document.querySelector("#my-tab").value;
  const offer_options = document.querySelector("#offer-options").value;
  const offer_details = document.querySelector("#offer-details").value;

  output += `***LOYALTY***\n\nName: ${toProperCase(name.value)}\nMSISDN: ${
    number.value
  }\n${
    pin.value
  }\nReason for Cancellation: ${reason}\nFinal Bill Date: ${month} ${cycle}\n`;
  output += tab ? `MyTab Balance $${tab} + taxes\n` : "";
  output += `Offer: ${offer_details} + (${offer_options})\n\nComments: ${comment}`;
  output += `\n${checkValue()}`;
  output += conversation_id.value
    ? `\n\nConversation ID: ${conversation_id.value}`
    : ``;
  care_notes.value = output;
}

function combineTech() {
  let output = "";
  const problem = document.querySelector("#tech-problem").value;
  const comment = document.querySelector("#tech-action").value;
  const sim = document.querySelector("#sim").value;
  const os = document.querySelector("#software").value;
  output += `***TECH SUPPORT***\n\nName: ${toProperCase(name.value)}\nMSISDN: ${
    number.value
  }\n${pin.value}\n
Problem: ${problem}\n\nRecommendations/Comments: ${comment}`;
  //Software & SIM Drop-downs
  output += !os
    ? ``
    : os === "y"
    ? `\n-Customer's software is up to date.`
    : `\n-Software is not up to date and I recommended performing an update.`;
  output += !sim
    ? ``
    : sim === "y"
    ? `\n-Customer's SIM is up to date.`
    : `\n-SIM needs to be updated and I sent them the Warranty and Repair.`;
  output += `\n${checkValue()}`;
  output += conversation_id.value
    ? `\n\nConversation ID: ${conversation_id.value}`
    : ``;
  care_notes.value = output;
}

function combinePort() {
  let output = "";
  const numberToPort = document.querySelector("#port-number").value;
  const temporaryNumber = document.querySelector("#temporary-number").value;
  const active = document.querySelector("#active").value;
  const wire = document.querySelector("#wire").value;
  const carrier = document.querySelector("#carrier").value;
  const name = document.querySelector("#porting-name").value;
  const address = document.querySelector("#address").value;
  const accountNumber = document.querySelector("#account-number").value;

  output += `Requested MSISDN: ${numberToPort}\nTemporary MSISDN: ${temporaryNumber}\nActive: ${active}\nType: ${wire}
Carrier: ${carrier}\nName: ${toProperCase(
    name
  )}\nAddress: ${address}\nAccount Number/PIN Number: ${accountNumber}`;

  porting_notes.value = output;
}

/**** END ALL COMBINE FUNCTIONS ****/

/*** Make sure name is capitalized ***/
toProperCase = function (s) {
  return s
    .toLowerCase()
    .replace(/\b((m)(a?c))?(\w)/g, function ($1, $2, $3, $4, $5) {
      if ($2) {
        return $3.toUpperCase() + $4 + $5.toUpperCase();
      }
      return $1.toUpperCase();
    });
};

/************************* History *************************/

const history_page = document.querySelector("#history-section");
const history_title = document.querySelector("#history-nav-item");
const history_button = document.querySelector("#history-clear-button");
const history_notes = document.querySelectorAll(".history-notes");

const history_list = JSON.parse(localStorage.getItem("history_list")) || [];

function history(notes) {
  const text = `${date()[1]} ${date()[0]}\n\n${notes}`;
  const new_item = {
    text,
    done: false
  };
  history_list.push(new_item);
  populateHistory(history_list, history_page);
  localStorage.setItem("history_list", JSON.stringify(history_list));
}

function populateHistory(history_list = [], history_page) {
  history_page.innerHTML = history_list
    .map((history_item, i) => {
      return `
        <textarea class="input color1 history-notes">
          ${history_item.text}
        </textarea>`;
    })
    .join("");
}

populateHistory(history_list, history_page);

function clearHistory() {
  window.localStorage.removeItem("history_list");
  populateHistory([], history_page);
}

function toHistory(notes) {
  if (!notes.value) {
    return;
  }
  history(notes.value);
}

history_button.addEventListener("click", clearHistory);

//////////////////////////////////////////////////////////////

function selectCombine(e) {
  if (e.target.classList.contains("retail-button")) {
    combineRetail();
    copy(retail_notes);
  } else if (e.target.classList.contains("porting-button")) {
    combinePort();
    copy(porting_notes);
  } else {
    switch (form_type_selector.value) {
      case "general":
        combineCare();
        break;
      case "promise":
        combinePtp();
        break;
      case "vacation":
        combineVacation();
        break;
      case "loyalty":
        combineLoyalty();
        break;
      case "technical":
        combineTech();
        break;
      default:
        combineCare();
    }
  }
}

number_copy_button.addEventListener("click", function () {
  copy(number);
});

/*** Combine Button Actions ***/

combine_button.forEach((e) =>
  e.addEventListener("click", function (e) {
    validate(required_fields);
    selectCombine(e);
    copy(care_notes);
  })
);

function selectFormReset(e) {
  if (e.target.classList.contains("care-button")) {
    hideShow(care_forms, "general", "grid"); // Reset back to General form
    hideShow(select_box, "general-predefined-multiselect", "grid");
    document.querySelector("#retail-predefined-multiselect").style.display =
      "grid";
    //hideShow(select_box, 'retail-predefined-multiselect', 'grid');
    toHistory(care_notes);
    care_notes.value = "";
    document.querySelector("#care-form").reset();
    handleSelectUX();
  } else if (e.target.classList.contains("porting-button")) {
    toHistory(porting_notes);
    porting_notes.value = "";
    document.querySelector("#porting-form").reset();
  } else {
    toHistory(retail_notes);
    hideShow(select_box, "general-predefined-multiselect", "grid");
    document.querySelector("#retail-predefined-multiselect").style.display =
      "grid";
    retail_forms.forEach((i) => (i.style.display = "none"));
    retail_notes.value = "";
    document.querySelector("#retail-form").reset();
  }
}

reset_button.forEach((e) =>
  e.addEventListener("click", function (e) {
    required_fields.forEach((i) => (i.style.backgroundColor = "var(--main)"));
    tag.selectedIndex = 0;
    document
      .querySelectorAll(".drop")
      .forEach((d) => (d.style.color = "#bababa"));
    selectFormReset(e);
  })
);

/*** Change Form on Care/Digital view ***/

form_type_selector.addEventListener("change", function () {
  hideShow(care_forms, form_type_selector.value, "grid");
  hideShow(
    select_box,
    `${form_type_selector.value}-predefined-multiselect`,
    "grid"
  );
  document.querySelector("#retail-predefined-multiselect").style.display =
    "grid";
});

/*** Change Page Title ****/

nav_items.forEach((e) =>
  e.addEventListener("click", function (e) {
    if (e.target.dataset.shows === "digital") {
      displayDigital();
    } else if (e.target.dataset.shows === "care") {
      window.location.reload();
    } else {
      hideShow(pages, `${e.target.dataset.shows}-page`, "grid");
    }
    e.target.classList.contains("team-link") === true &&
      hideShow(page_titles, `${e.target.dataset.shows}-title`, "grid");
  })
);

/*** move comments to all boxes ***/

action_boxes.forEach((i) =>
  i.addEventListener("change", function (e) {
    const action_value = e.currentTarget.value;
    action_boxes.forEach((i) => (i.value = action_value));
  })
);

/**** copy content ****/

copy_content.forEach((e) =>
  e.addEventListener("click", function (e) {
    copy(e.currentTarget);
  })
);

/****Predefined Content Messaging****/
const resources = Array.from(document.querySelectorAll(".resources"));
const predefined_messaging = document.querySelectorAll(".predefined_sentence");
const categories = document.querySelectorAll(".category");
const contents = document.querySelectorAll(".contents");

categories.forEach((e) =>
  e.addEventListener("click", function (e) {
    let content = document.getElementById(
      `${e.currentTarget.dataset.category}-content`
    );
    if (content.style.display === "none") {
      contents.forEach((e) => (e.style.display = "none"));
      content.style.display = "grid";
    } else {
      contents.forEach((e) => (e.style.display = "none"));
    }
  })
);

predefined_messaging.forEach((e) =>
  e.addEventListener("click", function (e) {
    copy(e.target);
  })
);

resources.forEach((element) =>
  element.addEventListener("click", function (e) {
    let copyText = resourcesContent[e.target.value];
    const dummy = document.createElement("textarea");
    dummy.value = copyText;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  })
);

/**** Singleview Predefined ****/

const select_box = document.querySelectorAll(".select-wrapper");
const options_box = document.querySelectorAll(".options-box");
const real_checkmark = document.querySelectorAll(".real-check");

// Indicate that element is checked //
function handleSelectUX() {
  real_checkmark.forEach((e) =>
    e.checked
      ? (e.parentElement.style.backgroundColor = "#0F154C")
      : (e.parentElement.style.backgroundColor = "#080D28")
  );
}

function checkValue() {
  let check = "";
  real_checkmark.forEach((e) =>
    e.checked ? (check += `\n\n${e.value}`) : (check += "")
  );
  return check;
}

function handleDrop(e) {
  if (e.currentTarget.children[2].style.display === "none") {
    e.currentTarget.children[2].style.display = "flex";
  } else {
    e.currentTarget.children[2].style.display = "none";
  }
}

real_checkmark.forEach((element) => (element.onchange = handleSelectUX));

select_box.forEach((e) =>
  e.addEventListener("click", function (e) {
    handleDrop(e);
  })
);

/************************* Themes *************************/

function themeChanger(
  a,
  b,
  c,
  d,
  e = "none",
  f = "10px",
  g = `"Roboto"`,
  h = "",
  j = "white",
  k = "none",
  l = "none"
) {
  // Body
  document.querySelector("body").style.backgroundColor = b;
  document.querySelector("body").style.fontFamily = g;
  // Inputs
  inputs.forEach((i) => {
    i.style.border = e;
    i.style.backgroundColor = a;
    i.style.color = c;
    i.style.borderRadius = f;
  });
  // Dropdowns
  selects.forEach((i) => {
    i.style.border = e;
    i.style.backgroundColor = a;
    i.style.color = "#bababa";
    i.style.borderRadius = f;
  });
  // Buttons
  buttons.forEach((i) => {
    i.style.backgroundColor = d;
    i.style.border = k;
    i.style.borderRadius = f;
    i.style.textTransform = h;
    i.style.fontFamily = g;
    i.style.color = j;
    i.style.outline = l;
  });
  // button hover
  document.documentElement.style.setProperty("--hov-text", `${b}`);
  //headers
  document.querySelectorAll(".header-item").forEach((i) => {
    i.style.color = c;
    i.style.textTransform = h;
  });
  //page titles
  page_titles.forEach((i) => {
    i.style.color = d;
    i.style.textTransform = h;
  });
  //hamburger menu
  document.querySelectorAll(".hamburger-line").forEach((i) => {
    i.style.backgroundColor = d;
  });
  // nav dropdowns
  document.querySelectorAll(".drop-down").forEach((i) => {
    i.style.backgroundColor = d;
  });
  //Predefined Messaging
  predefined_messaging.forEach((i) => {
    i.style.backgroundColor = a;
    i.style.color = d;
    i.style.border = e;
  });
  categories.forEach((i) => {
    i.style.backgroundColor = a;
    i.style.color = c;
    i.style.border = e;
  });
  resources.forEach((i) => {
    i.style.backgroundColor = a;
    i.style.color = d;
    i.style.border = e;
  });
  // Notes Predefined
  select_box.forEach((i) => {
    i.style.color = "#bababa";
  });
  options_box.forEach((i) => {
    i.style.backgroundColor = b;
    i.style.color = d;
  });

  document.documentElement.style.setProperty("--container-hover", "white");

  // Twitter
  document.querySelector(".twitter-overlay").style.backgroundColor = b;
  document.querySelector(".close-twitter").style.color = d;
  document.querySelector(".close-twitter").style.textTransform = h;
  //History

  document.querySelectorAll(".history-notes").forEach((i) => {
    i.style.border = e;
    i.style.backgroundColor = a;
    i.style.color = c;
    i.style.borderRadius = f;
  });
}

// rgba(226, 236, 255, .1)
//rgba(194, 202, 218, 1)
/*
document.querySelector('#light-theme').addEventListener('click', function () {
  document.querySelector('.twitter-timeline').dataset.theme = 'light';
  themeChanger("rgba(194, 202, 218, 0.3)", 'white',"#0F154C", '#56E97C', '#56E97C');
})
*/
document.querySelector("#night-theme").addEventListener("click", function () {
  themeChanger("#0C1C33", "#041123", "#5ed5fa", "#3c93f7");
});

document.querySelector("#retro-theme").addEventListener("click", function () {
  themeChanger(
    "black",
    "black",
    "white",
    "#aaaaaa",
    "1px solid #aaaaaa",
    "0",
    `'VT323'`,
    "uppercase",
    "black",
    "2px solid black",
    "1px solid #aaaaaa"
  );
});

document.querySelector("#default-theme").addEventListener("click", function () {
  location.reload();
});

/************************* Change Views / Layout *************************/
/**** Open & Close Twitter ****/

const open_twitter = document.querySelector(".navigation-button");
const close_twitter = document.querySelector(".close-twitter");
const twitter_overlay = document.querySelector(".twitter-overlay");

function toggleStyle() {
  twitter_overlay.style.width =
    twitter_overlay.style.width === "0px" || twitter_overlay.offsetWidth === 0
      ? "15em"
      : "0px";
}

open_twitter.addEventListener("click", function () {
  toggleStyle();
});

close_twitter.addEventListener("click", function () {
  toggleStyle();
});

/*** Half screen mode ***/

function halfScreenMode() {
  if (
    window.innerWidth <= 900 &&
    document.querySelector("#digital-page").style.display === "none" &&
    document.querySelector("#retail-page").style.display === "none"
  ) {
    document.querySelector("#care-page").style.gridTemplateColumns = "1fr";
    document.getElementById("care-button-group").style.gridArea =
      "2 / 1 / 2 / 2";
    care_notes.style.height = "14em";
    document.querySelector("#porting-page").style.gridTemplateColumns = "1fr";
    document.getElementById("porting-button-group").style.gridArea =
      "2 / 1 / 2 / 2";
    porting_notes.style.height = "14em";
  } else if (
    window.innerWidth >= 901 &&
    document.querySelector("#digital-page").style.display === "none" &&
    document.querySelector("#retail-page").style.display === "none"
  ) {
    document.querySelector("#care-page").style.gridTemplateColumns = "1fr 1fr";
    document.getElementById("care-button-group").style.gridArea =
      "2 / 2 / 2 / 3";
    care_notes.style.height = "22em";
    document.querySelector("#porting-page").style.gridTemplateColumns =
      "1fr 1fr";
    document.getElementById("porting-button-group").style.gridArea =
      "2 / 2 / 2 / 3";
    porting_notes.style.height = "22em";
  }
}

window.onresize = halfScreenMode;
window.onload = halfScreenMode;

/*** Digital View ***/

function displayDigital() {
  pages.forEach((e) => (e.style.display = "none"));
  document.getElementById("care-page").style.display = "grid";
  document.getElementById("care-page").style.gridGap = "1em";
  only_digital.forEach((e) => (e.style.display = "grid"));
  name.style.gridArea = "2 / 1 / 2 / 2";
  document.getElementById("digital-page").style.gridArea = "1 / 2 / 5 / 3";
  document.getElementById("care-button-group").style.gridArea = "2 / 1 / 2 / 2";
  document.getElementById("care-notes-group").style.gridArea = "3 / 1 / 3 / 2";
  care_notes.style.height = "9.5em";
}

/************************* Retail Support *************************/

/***Change Retail Form ***/
retail_form_type_selector.addEventListener("change", function () {
  hideShow(retail_forms, retail_form_type_selector.value, "grid");
});

function combineRetail() {
  let output = "";
  /*const cfa = document.querySelector("#cfa").value;
  const store = document.querySelector("#store").value;
  const rng = document.querySelector('#rng');
  const num = document.querySelector("#retail-number").value;
  const name = document.querySelector("#retail-name").value;
  const pin = document.querySelector("#retail-pin").value;
  const action = document.querySelector("#retail-action").value;*/
  output += `***RETAIL SUPPORT***\n\n`;
  output += `Team: ${document.querySelector("#retail-team-select").value}\n`;
  output += forms(document.querySelectorAll(`.retail-item`));
  output += checkValue();
  retail_notes.value = output;
}

function forms(items) {
  let content = "";
  const form_items = items;
  form_items.forEach((i) => {
    if (
      !i.classList.contains("check") &&
      !i.classList.contains("drop") &&
      i.value
    ) {
      content += `${i.placeholder}: ${i.value}\n`;
    } else if (i.classList.contains("check") && i.checked) {
      content += `${i.value}\n`;
    } else if (i.classList.contains("drop") && i.value) {
    }
  });
  return content;
}
/***** DIY PREDEFINED*** */
const input_for_predefined = document.querySelector("#add-content");
const personal_items = document.querySelectorAll(".personal_item");
const delete_button = document.querySelectorAll(".delete");
const add_button = document.querySelector("#add-content-button");

function addItem() {
  const available = Array.from(personal_items).filter((i) => !i.value);
  const value = input_for_predefined.value;
  const key_dataset = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49
  ];
  if (value) {
    if (available.length === 0) {
      alert("No more entries");
      return;
    }
    const key = available[0].dataset.key;
    localStorage.setItem(key, value);
    available[0].value = localStorage.getItem(key);
  } else {
    key_dataset.forEach((k) => {
      available[k].value = localStorage.getItem(k);
    });
  }
  hide();
}

function hide() {
  const show_items = Array.from(personal_items).filter((i) => i.value);
  personal_items.forEach((p) => {
    p.parentElement.style.display = "none";
  });
  show_items.forEach((i) => {
    i.parentElement.style.display = "grid";
  });
}

function deleteItem(e) {
  localStorage.removeItem(e.dataset.button);
  document.querySelector("#personal-content-form").reset();
  addItem();
}

window.onLoad = addItem();

add_button.addEventListener("click", function (e) {
  e.preventDefault();
  addItem();
  document.querySelector("#personal-create-form").reset();
});

delete_button.forEach((b) =>
  b.addEventListener("click", function (e) {
    e.preventDefault();
    deleteItem(e.currentTarget);
  })
);
