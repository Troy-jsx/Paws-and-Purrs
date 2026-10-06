import NavButton from "./NavButton";
import icon from "../assets/icons/AdoptionIcon.svg";
import hoverIcon from "../assets/icons/AdoptionHoverIcon.svg";

export default function AdoptionButton(props) {
  return <NavButton label="Adoption" px="px-16" icon={icon} hoverIcon={hoverIcon} {...props} />;
}