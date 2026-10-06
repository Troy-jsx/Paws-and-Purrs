import NavButton from "./NavButton";
import icon from "../assets/icons/DashIcon.svg";
import hoverIcon from "../assets/icons/DashIconHover.svg";

export default function DashboardButton(props) {
  return <NavButton label="Dashboard" px="px-16" icon={icon} hoverIcon={hoverIcon} {...props} />;
}