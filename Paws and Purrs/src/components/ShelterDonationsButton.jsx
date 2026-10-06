import NavButton from "./NavButton";
import icon from "../assets/icons/ShelterDonations.svg";
import hoverIcon from "../assets/icons/ShelterDonationsHoverIcon.svg";

export default function ShelterDonationsButton(props) {
  return <NavButton label="Shelter Donations" px="px-16" icon={icon} hoverIcon={hoverIcon} {...props} />;
}