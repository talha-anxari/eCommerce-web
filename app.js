import { 
  auth, 
  storage, 
  db, 
  signOut, 
  getDoc,
  doc,
  onAuthStateChanged, 
} from "./utils/utils.js";

const logoutBtn = document.getElementById('logout_btn');
const loginLink = document.getElementById('login_link');
const userImg = document.getElementById('user_img');
const userName = document.getElementById('user_name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    loginLink.style.display = 'none';
    userImg.style.display = 'inline-block';
    getUserInfo(uid);
  } else {
    // User is signed out
    loginLink.style.display = 'inline-block';
    userImg.style.display = 'none';
    window.location.href = '/auth/login/index.html';
  }
});

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful
    window.location.href = '/auth/login/index.html';
  }).catch((error) => {
    // An error happened
    console.error('Sign out error:', error);
  });
});

function getUserInfo(uid) {
  const userRef = doc(db, 'users', uid);
  getDoc(userRef)
    .then((doc) => {
      if (doc.exists()) {
        console.log('User ID:', doc.id);
        console.log('User Info:', doc.data());
        userImg.src = doc.data().img;  // Ensure this URL is correct
        userName.textContent = doc.data().firstName;  // Ensure this field exists
        email.textContent = doc.data().email;
        phone.textContent = doc.data().phone;
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.error('Error getting document:', error);
    });
}

const slideshow = document.getElementById('slideshow');
const images = [
    'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
];
let currentIndex = 0;

function changeBackgroundImage() {
    currentIndex = (currentIndex + 1) % images.length;
    slideshow.style.backgroundImage = `url('${images[currentIndex]}')`;
}

setInterval(changeBackgroundImage, 8000);

// Initialize the first image
changeBackgroundImage();