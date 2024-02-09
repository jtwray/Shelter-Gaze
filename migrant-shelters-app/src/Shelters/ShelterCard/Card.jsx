import React from "react";
import {
  Button,
  Card,
  Text,
  Badge,
  Box,
  AspectRatio,
  Flex,
} from "@radix-ui/themes";
import {
  RocketIcon,
  FaceIcon,
  ImageIcon,
  SunIcon,
  SpaceBetweenHorizontallyIcon,
} from "@radix-ui/react-icons";
// Version 1: Card component without a map
const BasicCard = ({ title, subheading, address, badges }) => {
  return (
    <Card>
      {/* <Box> */}
      <Text as="h2" size="2">
        {title}
      </Text>
      <Text as="p" size="4" color="gray" mb="2" marginBottom="0.5rem">
        {subheading}
      </Text>
      <Text as="p" size="3" mb="6" marginBottom="1rem">
        {address}
      </Text>
      <div>
        {badges.map((badge, index) => (
          <Badge key={index} color="gray">
            {badge}
          </Badge>
        ))}
      </div>
      {/* </Box> */}
    </Card>
  );
};
import { useStaticMapBox } from "../../hooks/useStaticMapBox.js";
// Version 2: Card component with a small map
const CardWithMap = ({
  title,
  subheading,
  address,
  badges,
  coords,
  onSelectShelter,
  setPopupInfo,
  mapRef,
  shelter,
}) => {
  const [crossStreetMap] = useStaticMapBox(
    coords.latitude,
    coords.longitude,
    15,
    613,
    150
  );
  return (
    <div>
      <Card>
        <div>
          {badges.map((badge, index) => (
            <Badge key={index} color="gray">
              {badge}
            </Badge>
          ))}
        </div>
        {/*
        <Flex justify="end" align="center">
          <Box>
            <Text as="span" size="3" mb="4">
              {subheading} <b>{title}</b>
            </Text>{" "}
          </Box>
        </Flex>
        <Flex justify="between" align="baseline">
          {" "}
          <Box pb="2">
            <Button
              onClick={() => {
                onSelectShelter(mapRef, coords, title);
                setPopupInfo(() => shelter);
              }}
            >
              <RocketIcon width="16" height="16" /> Show On Map
            </Button>
          </Box>
          <Text as="p" size="3" color="gray" mb="2">
            {address}
          </Text>
        </Flex> */}

        <Flex justify="between" align='center'>
          <Button size='4'
            onClick={() => {
              onSelectShelter(mapRef, coords, title);
              setPopupInfo(() => shelter);
            }}
          >
            <RocketIcon width="16" height="16" /> Show On Map
          </Button>
          <Flex direction="column" align="end">
            <em>{subheading}</em>
            <b>{title}</b>

            {address}
          </Flex>
        </Flex>
        {/* <Flex justify="end" align="center">
          <Box>
            <Text as="span" size="3" mb="4">
              {subheading} <b>{title}</b>
            </Text>{" "}
          </Box>
        </Flex>
        <Flex justify="between" align='baseline'>
          {" "}
          <Box pb='2'>
            <Button
              onClick={() => {
                onSelectShelter(mapRef, coords, title);
                setPopupInfo(() => shelter);
              }}
            >
              <RocketIcon width="16" height="16" /> Show On Map
            </Button>
          </Box>
          <Text as="p" size="3" color="gray" mb="2">
            {address}
          </Text>
        </Flex> */}
        <div
          style={{
            width: "100%",
            height: "150px",
            backgroundColor: "#f0f0f0",
            borderRadius: "0 0 8px 8px",
          }}
        >
          <div style={{ width: "613px", height: "150px" }}>
            <AspectRatio ratio={613 / 150}>
              <img
                src={crossStreetMap}
                alt="Map of the cross-streets for this shelter location."
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </AspectRatio>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { BasicCard, CardWithMap };
