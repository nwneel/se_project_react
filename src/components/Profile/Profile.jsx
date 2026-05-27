import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/SideBar";

export default function Profile({
  clothingItems = [],
  handleCardClick = () => {},
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}
