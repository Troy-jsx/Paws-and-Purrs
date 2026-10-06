import NavButton from "./NavButton";
import icon from "../assets/icons/DonateIcon.svg";
import hoverIcon from "../assets/icons/DonateIconHover.svg";

export default function DonateButton(props) {
  return <NavButton label="Donate" px="px-16" icon={icon} hoverIcon={hoverIcon} {...props} />;
}