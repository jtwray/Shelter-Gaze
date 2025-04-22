import React from "react";
import {
  Button,
  Card,
  Text,
  Badge,
  Box,
  AspectRatio,
  Flex,
  ScrollArea,
} from "@radix-ui/themes";
import { RocketIcon } from "@radix-ui/react-icons";
import { useStaticMapBox } from "../../hooks/useStaticMapBox.js";
import { useWindowSize } from "../../hooks/useWindowSize";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";

// Version 1: Card component without a map
const BasicCard = ({ title, subheading, address, badges }) => {
  return (
    <Card>
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
    </Card>
  );
};

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
  shelter,windowWidth
}) => {

  const calculatedWidth = Math.min(613, windowWidth - 40);
  const aspectRatio = 613 / 150;
  const calculatedHeight = Math.round(calculatedWidth / aspectRatio);

  const [crossStreetMap, isLoading, error] = useStaticMapBox(
    coords.latitude,
    coords.longitude,
    15,
    calculatedWidth,
    calculatedHeight
  );

  return (
    <Card size="3" style={{ maxWidth: calculatedWidth, margin: "0 auto" }}>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Box>
            <Text as="div" size="5" weight="bold" mb="1">
              {title}
            </Text>
            <Text as="div" size="2" color="gray">
              {subheading}
            </Text>
            <Text as="div" size="2" style={{ marginTop: "4px" }}>
              {address}
            </Text>
          </Box>
          <Button
            size="2"
            variant="soft"
            onClick={() => {
              onSelectShelter(mapRef, coords, title);
              setPopupInfo(() => shelter);
            }}
          >
            <RocketIcon width="16" height="16" />
            View on Map
          </Button>
        </Flex>

        <ScrollArea>
          <Flex gap="2" wrap="wrap" style={{ marginBottom: "8px" }}>
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="soft"
                color={["blue", "green", "orange", "red", "purple"][index % 5]}
              >
                {badge}
              </Badge>
            ))}
          </Flex>
        </ScrollArea>

        <Box
          style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "var(--gray-3)",
          }}
        >
          {isLoading && <LoadingSkeleton height={calculatedHeight} />}
          {error ? (
            <Flex
              align="center"
              justify="center"
              style={{
                height: calculatedHeight,
                color: "var(--gray-11)",
                borderRadius: "8px",
              }}
            >
              Unable to load map
            </Flex>
          ) : (
            <AspectRatio ratio={aspectRatio}>
              <img
                src={crossStreetMap}
                alt={`Map showing location of ${title}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: isLoading ? 0.5 : 1,
                  transition: "opacity 0.5s ease-in-out",
                  filter: isLoading ? 'blur(2px)' : 'none',
                  transform: isLoading ? 'scale(1.1)' : 'scale(1)',
                }}
                loading="lazy"
                decoding="async"
              />
            </AspectRatio>
          )}
        </Box>
      </Flex>
    </Card>
  );
};

export { BasicCard, CardWithMap };
