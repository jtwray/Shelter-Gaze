┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PROPOSED IMPLEMENTATION                               │
└───────────────────────────────────────┬─────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          PERSISTENT STORAGE INTERFACE                           │
│                                                                                 │
│   localStorage/IndexedDB               Cache Structure                          │
│   ┌────────────────────────┐          ┌─────────────────────────────────────┐   │
│   │ "shelter-maps": {...}  │──────────▶ {                                   │   │
│   └────────────────────────┘          │   "version": "1.0",                 │   │
│                                       │   "lastCleanup": 1650000000000,     │   │
│   ┌────────────────────────┐          │   "entries": {                      │   │
│   │ Storage Interface      │          │     "url-hash-1": {                 │   │
│   │ ┌──────────────────┐   │          │       "url": "mapbox.com/img1.jpg", │   │
│   │ │ async get(key)   │   │          │       "data": "base64-data-string", │   │
│   │ │ async set(k,v)   │   │          │       "size": 24500,                │   │
│   │ │ async remove(key)│   │          │       "timestamp": 1650000000000,   │   │
│   │ └──────────────────┘   │          │       "device": { "ratio": 2, ... } │   │
│   └────────────────────────┘          │     },                              │   │
│                                       │     // More entries...              │   │
│                                       │   }                                 │   │
│                                       │ }                                   │   │
│                                       └─────────────────────────────────────┘   │
└───────────────────────────────────────┬─────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                               useImageCache HOOK                                │
│                                                                                 │
│   const options = {                                                             │
│     namespace: 'shelter-maps',    // Separate storage for different apps        │
│     version: '1.0',              // For cache invalidation                     │
│     expireAfter: 7 * 24 * 60 * 60 * 1000,  // 7 days                           │
│     maxEntries: 50,              // Limit entry count                          │
│     maxStorageSize: 50 * 1024 * 1024,  // 50MB limit                           │
│   };                                                                            │
└───────────────────────────────────────┬─────────────────────────────────────────┘
                                        │
                                        ▼
                         ┌──────────────┴───────────────┐
                         │ Check persistent cache first │
                         └──────────────┬───────────────┘
                                        │
         ┌────────────────────────────┐ │ ┌──────────────────────────┐
         │                            │ │ │                          │
         ▼                            │ │ ▼                          │
┌────────────────────────────┐        │ │ ┌──────────────────────────┐
│ VALID CACHE:               │        │ │ │ CACHE MISS:              │
│ 1. Return cached base64    │        │ │ │ 1. Fetch image           │
│    image data immediately  │        │ │ │ 2. Convert to base64     │
│ 2. Check if expired        │        │ │ │ 3. Store in cache        │
│ 3. If expired, revalidate  │        │ │ │ 4. Manage cache size     │
│    in background           │        │ │ │ 5. Return the image      │
└────────────┬───────────────┘        │ │ └──────────┬───────────────┘
             │                        │ │            │
             │                        ▼ ▼            │
             │      ┌────────────────────────────────┐
             └─────►│    Return cachedImage (base64) │
                    └────────────────┬───────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────────┐
│                               CachedCardWithMap                                │
│                                                                                │
│ // Component using both hooks together                                         │
│ const [mapUrl, mapLoading] = useStaticMapBox(coords...);                       │
│ const { cachedImage } = useImageCache(mapUrl, options);                        │
│                                                                                │
│ return <img src={cachedImage || mapUrl} />                                    │
└────────────────────────────────────────────────────────────────────────────────┘