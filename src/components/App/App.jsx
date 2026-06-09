import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Footer from "../Footer/Footer.jsx";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../Contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import { addItem, getItems, removeItem } from "../../utils/api.js";

function App() {
  const location = useLocation();
  /* type changes the clothes when you enter the weather type which calls the item from */
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setActiveModal("delete-confirmation");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeAllModal();
      })
      .catch(console.error);
  };

  const handleAddItemSubmit = (item) => {
    const pageSource = location.pathname === "/" ? "main" : "profile";
    const newItem = {
      _id: Date.now(),
      name: item.name,
      weather: item.weatherType,
      imageUrl: item.imageUrl,
      addedFrom: pageSource,
    };
    addItem(newItem)
      .then((serverItem) => {
        // Add the addedFrom property to the server response since json-server won't persist it
        const completeItem = { ...serverItem, addedFrom: pageSource };
        setClothingItems([completeItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };
  /* Helps delete item when you click delete item */
  const deleteItem = (itemId) => {
    removeItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // defines the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        //Todo: Make new images appear when you add an image
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  //Todo-Add a delete button to the preview modal
  //Declare a handler in App.jsx (deleteItemHandler)
  //Pass handler to preview modal
  //Inside preview modal, pass the ID as an argument to the handler (use handler pattern found in ItemCard)
  //Inside the handler
  //- call removeItem function, pass it the ID
  //- in the .then() remove the item from the array

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  currentTemperatureUnit={currentTemperatureUnit}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
            {/* Helps create a 404 error when you access a webpage the doesn't exist */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          onClose={closeActiveModal}
        ></AddItemModal>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteItem={handleDeleteClick}
        />
        <DeleteConfirmationModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          /* Helps delete image after you click Yes, delete item */
          onDeleteItem={() => deleteItem(selectedCard._id)}
          card={selectedCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
