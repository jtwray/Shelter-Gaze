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
import { useImageCache } from "../../hooks/useImageCache.js";
import { LoadingSkeleton } from "../../components/LoadingSkeleton";

export const CachedCardWithMap = ({
  title,
  subheading,
  address,
  badges,
  coords,
  onSelectShelter,
  setPopupInfo,
  mapRef,
  shelter,
  cachedMapImage, // Optional: Pre-cached image passed from parent
  windowWidth, // Get windowWidth from props
}) => {
  const calculatedWidth = Math.min(613, windowWidth - 40);
  const aspectRatio = 600/150; // 4:1 aspect ratio
  const calculatedHeight = Math.round(calculatedWidth / aspectRatio);

  let isLoading = false;
  let error = null;

  const [mapUrl, mapLoading, mapError] = !cachedMapImage
    ? useStaticMapBox(
        coords.latitude,
        coords.longitude,
        15,
        calculatedWidth,
        calculatedHeight
      )
    : [null, false, null];

  const { cachedImage, isLoading: cacheLoading, error: cacheError } = !cachedMapImage
    ? useImageCache(mapUrl, {
        namespace: "shelter-maps",
        version: "1.0",
        expireAfter: 7 * 24 * 60 * 60 * 1000, // 1 week
        maxEntries: 50,
      })
    : { cachedImage: null, isLoading: false, error: null };

  isLoading = mapLoading || cacheLoading;
  error = mapError || cacheError;

  const imageToShow = cachedMapImage || cachedImage || mapUrl;

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
              setPopupInfo(shelter);
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
                src={imageToShow}
                alt={`Map showing location of ${title}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: isLoading ? 0.5 : 1,
                  transition: "opacity 0.5s ease-in-out",
                  filter: isLoading ? "blur(2px)" : "none",
                  transform: isLoading ? "scale(1.1)" : "scale(1)",
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