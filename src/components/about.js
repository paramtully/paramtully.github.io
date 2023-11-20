
function ProfilePhoto() {
    return <img src="https://media.licdn.com/dms/image/C5603AQFFgv2nb1LeKA/profile-displayphoto-shrink_100_100/0/1659311137899?e=1691020800&v=beta&t=HZU3w3WP97rACVwVbXeCGM684y9UZv7WG6dcQ7uUUDI" alt="Param Tully"/>;
}

export default function About() {
    return (
        <section id='about'>
            <h2 className="sectionTitle">ABOUT</h2>
            <p>
                {/* Who am i? / how did i get into SWE */}
                My career as a software engineer began when I decided to take an intro CS course as an elective 
                in my second year of university. I immediately fell in love with the endless possibilities of 
                what I could create. My curiosity of the many fields in CS and their applications have guided me
                through my degree and will continue to carry me far into the future.
            </p>
            <p>
                {/* mission stuff */}
                My current focus is on learning all aspects of full-stack web development, including the 
                implementation of CI/CD solutions. My goal is to be able to independently produce applications 
                from conception at scale.
            </p>
            <p>
                {/* outside of work stuff */}
                When I'm not at my computer, You'll often find me working out, playing basketball either at my 
                local YMCA or in UBC's intramural basketball league, exploring the food scene in Vancouver, 
                or watching a nice and relaxing horror movie.
            </p>
        </section>
    );
}

export { ProfilePhoto };