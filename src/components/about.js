
function ProfilePhoto() {
    return <img src="https://media.licdn.com/dms/image/C5603AQFFgv2nb1LeKA/profile-displayphoto-shrink_100_100/0/1659311137899?e=1691020800&v=beta&t=HZU3w3WP97rACVwVbXeCGM684y9UZv7WG6dcQ7uUUDI" alt="Param Tully"/>;
}

export default function About() {
    return (
        <section id='about'>
            <h2 className="sectionTitle">ABOUT</h2>
            <p>
                {/* Who am i? / how did i get into SWE */}
                I'm just a cs student following whatever peeks my curiousity.
            </p>
            <p>
                {/* mission stuff */}
                My interest lies in finding ways to automate tasks as I find value in streamlining workflows
                and thus saving time that can otherwise be used more productively. This has led me into fields 
                such as DevOps, where I've worked on automated cloud deployment pipelines and more recently 
                machine learning.
            </p>
            <p>
                {/* outside of work stuff */}
                When I'm not at my desk, You'll often find me working out, playing basketball either at my local 
                YMCA or in UBC's intramural basketball league, exploring the food scene in Vancouver, or watching 
                a relaxing horror movie.
            </p>
        </section>
    );
}

export { ProfilePhoto };