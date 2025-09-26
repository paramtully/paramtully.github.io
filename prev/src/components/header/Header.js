import NameCard from "./NameCard";
import NavBar from "./NavBar";
import SocialMedia from "./SocialMedia";

export default function Header() {
    return (
        <header className="header">
            <div className="nav">
                <NameCard />
                <NavBar />
                <SocialMedia />
            </div>
        </header>
    );
}
