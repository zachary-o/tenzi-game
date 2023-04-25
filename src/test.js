let obj = {
  country: "Ukraine",
  cities: {
    kyiv: {
      name: "Kyiv",
      population: 2800000,
    },
  },
  isPopular: false,
};

let cloneObj = {
  ...obj,
  cities: {
    ...obj.cities,
    kamPod: { name: "Kam-Pod", population: 100000 },
  },
};

delete cloneObj.isPopular

console.log(cloneObj);



const user = {
  name: "Anton",
  password: "12345678",
  id: "0",
};

const userUpdate = {
  password: "ttt8765",
  id: "6x58sdfje",
  age: 38,
};

const mergedObj = {...user, ...userUpdate}
console.log(mergedObj)

