/* Global Variables */

const zipInput = document.getElementById('zip');
const messageInput = document.getElementById('feelings');
const button = document.getElementById('generate');
const dateHolder = document.getElementById('date');
const tempDegree = document.getElementById('temp');
const content = document.getElementById('content');

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
const ApiKey = '&appid=f8e461f76cbb34da3132d2a725c44fc8&units=imperial'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

button.addEventListener('click', async () => {
  const zipValue = zipInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (zipValue.length === 0 || messageValue.length === 0) {
    alert('Please Enter All Values!')
    return;
  }

  if (isNaN(parseInt(zipValue))) {
    alert('Please Enter Numbers Only for Zip Code!')
    return;
  }

  const temp = await getTemp(zipValue);
  await postData({ message: messageValue, temp, date: newDate });
  updateUI();

});

async function getTemp(zipCode) {
  try {
    const res = await fetch(baseUrl + zipCode + ApiKey);
    const data = await res.json();
    return data.main.temp;
  } catch (e) {
    alert(e);
  }
}

async function postData(Data) {
  try {
    const res = await fetch('/api', {
      body: JSON.stringify(Data),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('error!')
    }
  } catch (e) {
    alert(e);
  }
}

async function getData() {
  try {
    const res = await fetch('/api');
    const data = await res.json();
    return data;
  } catch (e) {
    alert(e);
  }
}

async function updateUI() {
  const { temp, message, date } = await getData();
  console.log(temp + message + date)
  dateHolder.textContent = 'Date: ' + date;
  tempDegree.textContent = 'Temperature: ' + temp;
  content.textContent = 'I feel : ' + message;

}