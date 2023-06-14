
function ProfilePhoto() {
    return <img src="https://media.licdn.com/dms/image/C5603AQFFgv2nb1LeKA/profile-displayphoto-shrink_100_100/0/1659311137899?e=1691020800&v=beta&t=HZU3w3WP97rACVwVbXeCGM684y9UZv7WG6dcQ7uUUDI" alt="Photo of Param Tully"/>;
}

export default function About() {
    return (
        <section id='about'>
            <h2>About</h2>
            <p>
                {/* Who am i? */}
                Who am i 
            </p>
            <p>
                {/* mission stuff */}
                mission stuff
            </p>
            <p>
                 {/* outside of work stuff */}
                 outside of work stuff
            </p>
        </section>
    );
}

export { ProfilePhoto };