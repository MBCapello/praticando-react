import { useState } from 'react';
import cmenu from './assets/open-menu.svg';
import home from './assets/active-home.svg';
import ilike from './assets/inactive-like.svg';
import menuHamb from './assets/closed-menu.svg';
import cmodal from './assets/close-modal.svg';
import likebtn from './assets/like.svg';
import settings from './assets/inactive-settings.svg';

import photo1 from './assets/gallery/image 1.png';
import photo2 from './assets/gallery/image 2.png';
import photo3 from './assets/gallery/image 3.png';
import photo4 from './assets/gallery/image 4.png';
import photo5 from './assets/gallery/image 5.png';
import photo6 from './assets/gallery/image 6.png';
import photo7 from './assets/gallery/image 7.png';
import photo8 from './assets/gallery/image 8.png';
import photo9 from './assets/gallery/image 9.png';
import photo10 from './assets/gallery/image 10.png';

const objGallery = [{
  id: 1,
  photo: photo1,
  liked: false
},
{
  id: 2,
  photo: photo2,
  liked: false
},
{
  id: 3,
  photo: photo3,
  liked: false
},
{
  id: 4,
  photo: photo4,
  liked: false
},
{
  id: 5,
  photo: photo5,
  liked: false
},
{
  id: 6,
  photo: photo6,
  liked: false
},
{
  id: 7,
  photo: photo7,
  liked: false
},
{
  id: 8,
  photo: photo8,
  liked: false
},
{
  id: 9,
  photo: photo9,
  liked: false
},
{
  id: 10,
  photo: photo10,
  liked: false
}];


function Menu(props) {
  return (
    <aside className="Menu" style={{ width: props.style ? '199px' : '69px' }}>
      <div >
        <nav>
          <ul className="Menu__top">
            <li>
              <img src={props.menu} alt="menu" onClick={() => props.closeMenu()} />
            </li>
            <li>
              <img src={props.home} alt="home" />
              <span className="Menu__span">{props.homeText}</span>
            </li>
            <li>
              <img src={props.ilike} alt="liked" />
              <span className="Menu__span">{props.ilkeText}</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="Menu__bot">
        <img src={props.settings} alt="settings" />
        <span className="Menu__span">{props.settingsText}</span>
      </div>
    </aside>
  )
};
function Gallery(props) {
  return (
    <div className="photoGallery" >
      <img className="photo__img" alt=""
        src={props.photo}
        id={props.id}
        onClick={() => props.modal(props.id)}
      />
      <img className="likedbtn" alt="" src={props.liked ? likebtn : ''} />
      <div className="photoText">
        <b>Lorem ipsum</b><span>Há 1 mês atrás</span>
      </div>
    </div>
  )
};
function OpenModal(props) {
  return (
    <div className={props.photo ? "modal" : "none"}>
      <img className="cmodal" src={cmodal} onClick={props.close} alt="" />
      <img className="modalImg" src={props.photo ? props.photo : ''} alt=""
        onClick={() => props.db(props.id)} />
      <img className="likedbtn2" alt="" src={props.liked ? likebtn : ''} />
    </div>
  )
}

function App() {

  const [menu, setMenu] = useState(false);
  const [gallery, setGallery] = useState(objGallery)
  const [modalP, setModalP] = useState([]);

  function handleCloseMenu() {
    const menuState = !menu;
    setMenu(menuState)
  };

  function handleModal(id) {
    const modalPhoto = gallery.find((photo) => {
      return photo.id === id;
    })
    setModalP(modalPhoto)
  };

  function handleCloseModal() {
    setModalP([]);
  };

  function handleDBclick(id) {
    const newGallery = [...gallery];
    const liked = newGallery.find(function (photo) {
      return photo.id === id;
    });
    liked.liked = !liked.liked;
    setGallery(newGallery)
  };

  return (
    <div className="App">

      <Menu menu={menu ? cmenu : menuHamb}
        home={home}
        ilike={ilike}
        closeMenu={handleCloseMenu}
        settings={settings}
        style={menu}
        homeText={!menu ? "" : "Home"}
        ilkeText={!menu ? "" : "Likes"}
        settingsText={!menu ? "" : "Settings"} />

      <h1 className="Main__text">Ínicio</h1>

      <main className="Main">
        {gallery.map((photos) => {
          return (
            <Gallery
              key={photos.id}
              id={photos.id}
              photo={photos.photo}
              liked={photos.liked}
              modal={handleModal}
            />
          )
        })};
      </main>
      <OpenModal
        photo={modalP.photo}
        id={modalP.id}
        close={handleCloseModal}
        liked={modalP.liked}
        db={handleDBclick}
      />
    </div>
  );
}

export default App;