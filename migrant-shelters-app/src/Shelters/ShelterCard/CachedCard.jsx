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
import { useViewport } from "../../hooks/useViewport";

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
  cachedMapImage,
  windowWidth, 
  windowHeight
}) => {
  const { size } = useViewport();
  const isMobile = size === 'xs' || size === 'xs-' || size === 'sm';
  
  // Calculate responsive dimensions
  const getPadding = () => {
    if (size === 'xs-') return 8;
    if (size === 'xs') return 12;
    if (size === 'sm') return 16;
    return 20;
  };
  
  const calculatedWidth = Math.min(613, windowWidth - (getPadding() * 2));
  const aspectRatio = isMobile ? 600/120 : 600/150; // More compact aspect ratio on mobile
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
    <Card size={isMobile ? "2" : "3"} style={{ maxWidth: calculatedWidth, margin: "0 auto" }}>
      <Flex direction="column" gap={isMobile ? "2" : "3"}>
        <Flex justify="between" align="start" wrap={isMobile ? "wrap" : "nowrap"}>
          <Box style={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}>
            <Text as="div" size={isMobile ? "3" : "5"} weight="bold" mb={isMobile ? "0" : "1"}>
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
            size={isMobile ? "1" : "2"}
            variant="soft"
            onClick={() => {
              onSelectShelter(mapRef, coords, title);
              setPopupInfo(shelter);
            }}
            style={isMobile ? { marginTop: '8px', alignSelf: 'flex-end' } : {}}
          >
            <RocketIcon width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} />
            {isMobile ? 'Map' : 'View on Map'}
          </Button>
        </Flex>

        <ScrollArea style={{ maxHeight: isMobile ? '60px' : '80px' }}>
          <Flex gap="2" wrap="wrap" style={{ marginBottom: isMobile ? "4px" : "8px" }}>
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="soft"
                size={isMobile ? "1" : "2"}
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