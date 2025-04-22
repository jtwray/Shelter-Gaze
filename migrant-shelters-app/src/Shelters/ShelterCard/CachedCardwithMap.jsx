// Now a pure presentational component
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
  cachedMapImage, // Pre-cached image passed from parent
  isLoading
}) => {
  const [windowWidth] = useWindowSize();
  const calculatedWidth = Math.min(613, windowWidth - 40);
  const aspectRatio = 613 / 150;
  const calculatedHeight = Math.round(calculatedWidth / aspectRatio);

  return (
    <Card size="3" style={{ maxWidth: calculatedWidth, margin: "0 auto" }}>
      {/* Card content */}
      <Box style={{ position: "relative" }}>
        {isLoading ? (
          <LoadingSkeleton height={calculatedHeight} />
        ) : (
          <AspectRatio ratio={aspectRatio}>
            <img
              src={cachedMapImage}
              alt={`Map showing location of ${title}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="lazy"
              decoding="async"
            />
          </AspectRatio>
        )}
      </Box>
    </Card>
  );
};