import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__name">
        <p className="clothes-section__item">Your items</p>
        <button className="clothes-section__new">+ Add new</button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => item.addedFrom === "profile" || !item.addedFrom)
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
    </div>
  );
}
