import axios from 'axios';
import FormData from " "
import fs from "node:fs/promises"

var config = {
  method: 'get',
  url: 'https://susa.deta.dev/from-github',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});




// Read image from disk as a Buffer
const image = await fs.readFile('./hello.text');

// Create a form and append image with additional fields
const form = new FormData();
form.append('productName', 'Node.js Stickers');
form.append('productDescription', 'Cool collection of Node.js stickers for your laptop.');
form.append('productImage', image, 'hello.text');

// Send form data with axios
const response = await axios.post('https://susa.deta.dev/from-github/upload', form, {
  headers: {
    ...form.getHeaders(),
  },
});