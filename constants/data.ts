import icons from "./icons";
import images from "./images";

export const cards = [
  {
    title: "card1", // Ключ для перевода
    location: "location1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.newYork,
  },
  {
    title: "card2",
    location: "location2",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.japan,
  },
  {
    title: "card3",
    location: "location3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.newYork,
  },
  {
    title: "card4",
    location: "location4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.japan,
  },
];

export const featuredCards = [
  {
    title: "featured1",
    location: "location1",
    price: "$100",
    rating: 4.8,
    image: images.newYork,
    category: "house",
  },
  {
    title: "featured2",
    location: "location2",
    price: "$200",
    rating: 3,
    image: images.japan,
    category: "flat",
  },
];

export const categories = [
  { title: "all", category: "All" },
  { title: "house", category: "House" },
  { title: "condo", category: "Condo" },
  { title: "duplex", category: "Duplex" },
  { title: "studio", category: "Studio" },
  { title: "villas", category: "Villa" },
  { title: "apartments", category: "Apartment" },
  { title: "townhomes", category: "Townhouse" },
  { title: "others", category: "Other" },
];

export const settings = [
  { title: "myBookings", icon: icons.calendar },
  { title: "payments", icon: icons.wallet },
  { title: "notifications", icon: icons.bell },
  { title: "profile", icon: icons.person },
  { title: "security", icon: icons.shield },
  { title: "language", icon: icons.language },
  { title: "helpCenter", icon: icons.info },
  { title: "inviteFriends", icon: icons.people },
];

export const facilities = [
  { title: "Laundry", icon: icons.laundry },
  { title: "Parking", icon: icons.carPark },
  { title: "Sports Center", icon: icons.run },
  { title: "Cutlery", icon: icons.cutlery },
  { title: "Gym", icon: icons.dumbell },
  { title: "Swimming pool", icon: icons.swim },
  { title: "Wifi", icon: icons.wifi },
  { title: "Pet-friendly", icon: icons.dog },
];

export const gallery = [
  { id: 1, image: images.newYork },
  { id: 2, image: images.japan },
  { id: 3, image: images.newYork },
  { id: 4, image: images.japan },
  { id: 5, image: images.newYork },
  { id: 6, image: images.japan },
];