import NavButton from "./NavButton";
import icon from "../assets/icons/AOTMIcon.svg";
import hoverIcon from "../assets/icons/AOTMHoverIcon.svg";

export default function AOTMButton(props) {
  return <NavButton label="Animal of the Month" shortLabel="Monthly Animal" icon={icon} hoverIcon={hoverIcon} {...props} />
}