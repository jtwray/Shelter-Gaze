// import "./shelter-card.css";
import { Card, Avatar, Flex, Text, Box, Badge, Em } from "@radix-ui/themes";

export function ShelterCard({ shelter }) {
  const { name, location, type, services } = shelter;
  // const { name, location, type, services, coordinates: { latitude, longitude } } = shelter;
  // const { name, location, type, services, coordinates: { latitude, longitude } } = shelters[0];
  const colors = [
    "tomato",
    "red",
    "ruby",
    "crimson",
    "pink",
    "plum",
    "purple",
    "violet",
    "iris",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "jade",
    "green",
    "grass",
    "brown",
    "orange",
    "sky",
    "mint",
    "lime",
    "yellow",
    "amber",
    "gold",
    "bronze",
    "gray",
  ];

  return (
    <>
      <Card>
        <Flex>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              color: "grey",
              border: "indigo 3px solid",
            }}
          >
            <div>
              <span>
                <b style={{ color: "black" }}>{name}</b>

                <Text as="p">( {type} )</Text>
              </span>
              <Em>
                <address>{location}</address>
              </Em>
            </div>
            <Box width="50%">
              <Flex gap="1" wrap="wrap">
                {services.map((s, idx) => (
                  <span style={{ flexBasis: "30%", height: "20%" }} key={s}>
                    <Badge color={colors[idx]}>{s}</Badge>
                  </span>
                ))}
              </Flex>
            </Box>
          </div>
        </Flex>{" "}
      </Card>
      {/* <Card style={{ maxWidth: 240 }}>
        <Flex gap="3" align="center" justify="between">
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              Teodros Girmay
            </Text>
            <Text as="div" size="2" color="gray">
              Engineering
            </Text>
          </Box>
        </Flex>
      </Card>
      <Card style={{ maxWidth: 240 }}>
        <Flex gap="3" align="center" justify="between">
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              Teodros Girmay
            </Text>
            <Text as="div" size="2" color="gray">
              Engineering
            </Text>
          </Box>
        </Flex>
      </Card> */}
    </>
  );
}
