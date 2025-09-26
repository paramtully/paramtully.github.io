import Bentolio from "@shohojdhara/atomix/bentolio";
 
export default function Example() {
  return (
    <Bentolio
      bg="#E8F3FF"
      secondary="#B8DCFF"
      name={{
        first: "PARAM",
        last: "TULLY"
      }}
      title="Developer Creating Digital Experiences"
      curvedText="Digital"
      profileImage="/path/to/custom-profile.jpg"
      socialLinks={[
        { name: "GitHub", url: "https://github.com/alexchen" },
        { name: "LinkedIn", url: "https://linkedin.com/in/alexchen" },
        { name: "Twitter", url: "https://twitter.com/alexchen" }
      ]}
    />
  );
}
