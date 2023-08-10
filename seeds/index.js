const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect('mongodb://localhost:27017/phil-camp');
  console.log('Seed Database Connected');
}

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const randPrice = Math.floor(Math.random() * 2000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://loremflickr.com/300/300/woods?random=${random1000}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae distinctio quo, provident consequatur repudiandae voluptatibus hic sapiente, sit vero ipsam vel quisquam repellendus repellat ut sint dignissimos alias at placeat.',
      price: randPrice,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
