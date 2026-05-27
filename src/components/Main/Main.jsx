import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  currentTemperatureUnit,
}) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        {/* changes to celius when you change the temperature to celius */}
        <p className="card__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit} / You may want to wear:{" "}
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return (
                item.weather === weatherData.type &&
                (!item.addedFrom || item.addedFrom === "main")
              );
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
