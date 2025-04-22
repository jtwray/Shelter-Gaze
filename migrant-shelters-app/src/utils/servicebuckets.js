// /**
//  * Eight top‑priority need “buckets”  every bucket is a Set of the
//  * exact strings as they appear in your data.
//  */
// const PRIORITY_BUCKETS = {
//     // 1) Guaranteed place to sleep indoors
//     shelter: new Set([
//         "24-hour drop-in center",
//         "21-day shelter",
//         "shelter program for the homeless",
//         "temporary through permanent emergency housing",
//         "147 beds",
//         "safe, supportive emergency housing for women and their dependent children",
//         "safe environment",
//         "continuum of care from homelessness to self-sufficiency"
//     ]),

//     // 2) Food & water
//     food: new Set([
//         "hot meals",
//         "meals provided"
//     ]),

//     // 3) Basic hygiene & warmth
//     hygiene: new Set([
//         "showers",
//         "laundry facilities",
//         "clothing"
//     ]),

//     // 4) Medical & mental‑health care (incl. substance‑use treatment)
//     health: new Set([
//         "medical care",
//         "medical services",
//         "non-acute and serious medical problems",
//         "psych. evaluations and treatment",
//         "health monitoring and education",
//         "substance abuse counseling"
//     ]),

//     // 5) Case management & referrals
//     caseMgmt: new Set([
//         "case management services",
//         "case management",
//         "referrals to social services",
//         "advocacy and empowerment",
//         "support for productive citizenship"
//     ]),

//     // 6) Income / job pathway
//     employment: new Set([
//         "employment referrals",
//         "vocational and educational training",
//         "skills and tools development",
//         "vocational services"
//     ]),

//     // 7) Longer‑term housing solutions
//     housing: new Set([
//         "permanent or transitional housing",
//         "housing assistance",
//         "92% success rate in finding permanent housing for those staying for more than two weeks"
//     ]),

//     // 8) Community & sobriety supports
//     community: new Set([
//         "aa and na meetings daily on campus",
//         "aa meeting on-site once a week",
//         "support groups",
//         "recreational space",
//         "leisure activities"
//     ])
// };

// /**
//  * filterTopServices  ▸  Extract only the services that fall into
//  * the eight priority buckets above.
//  *
//  * @param {Map<string, number>} servicesMap – your original Map
//  * @returns {Object<string, Map<string, number>>}  e.g. { shelter: Map(…), food: Map(…), … }
//  */
// function filterTopServices(servicesMap) {
//     const out = {};

//     for (const [serviceName, count] of servicesMap) {
//         // Find the bucket (if any) that contains this service
//         for (const [bucketName, bucketSet] of Object.entries(PRIORITY_BUCKETS)) {
//             if (bucketSet.has(serviceName)) {
//                 if (!out[bucketName]) out[bucketName] = new Map();
//                 out[bucketName].set(serviceName, count);
//                 break;  // done once we’ve matched a bucket
//             }
//         }
//     }
//     return out;     // e.g. out.shelter → Map with 8 entries, etc.
// }

// /* ----------  Example usage  ---------- */
// // imagine `allServices` is the Map you posted
// // const filtered = filterTopServices(allServices);
// // console.log(filtered.shelter);   // Map(8) { "24-hour drop‑in center" → 1, … }


// // Flat result: just the matching services themselves
// function getTopServiceMap(servicesMap) {
//     const TOP = new Set(
//         Object.values(PRIORITY_BUCKETS).flatMap(set => [...set])
//     );
//     return new Map([...servicesMap].filter(([svc]) => TOP.has(svc)));
/**
 * Eight top‑priority need "buckets"  every bucket is a Set of the
 * exact strings as they appear in your data.
 */
export const PRIORITY_BUCKETS = {
    // 1) Guaranteed place to sleep indoors
    shelter: new Set([
        "24-hour drop-in center",
        "21-day shelter",
        "shelter program for the homeless",
        "temporary through permanent emergency housing",
        "147 beds",
        "safe, supportive emergency housing for women and their dependent children",
        "safe environment",
        "continuum of care from homelessness to self-sufficiency"
    ]),

    // 2) Food & water
    food: new Set([
        "hot meals",
        "meals provided"
    ]),

    // 3) Basic hygiene & warmth
    hygiene: new Set([
        "showers",
        "laundry facilities",
        "clothing"
    ]),

    // 4) Medical & mental‑health care (incl. substance‑use treatment)
    health: new Set([
        "medical care",
        "medical services",
        "non-acute and serious medical problems",
        "psych. evaluations and treatment",
        "health monitoring and education",
        "substance abuse counseling"
    ]),

    // 5) Case management & referrals
    caseMgmt: new Set([
        "case management services",
        "case management",
        "referrals to social services",
        "advocacy and empowerment",
        "support for productive citizenship"
    ]),

    // 6) Income / job pathway
    employment: new Set([
        "employment referrals",
        "vocational and educational training",
        "skills and tools development",
        "vocational services"
    ]),

    // 7) Longer‑term housing solutions
    housing: new Set([
        "permanent or transitional housing",
        "housing assistance",
        "92% success rate in finding permanent housing for those staying for more than two weeks"
    ]),

    // 8) Community & sobriety supports
    community: new Set([
        "aa and na meetings daily on campus",
        "aa meeting on-site once a week",
        "support groups",
        "recreational space",
        "leisure activities"
    ])
};

// Human-readable labels for buckets
export const BUCKET_LABELS = {
    shelter: "Shelter",
    food: "Food & Water", 
    hygiene: "Hygiene",
    health: "Healthcare",
    caseMgmt: "Case Management",
    employment: "Employment",
    housing: "Housing Assistance",
    community: "Community Support"
};

// Helper to check if a service belongs to a bucket
export const serviceInBucket = (service, bucketName) => {
    return PRIORITY_BUCKETS[bucketName] && PRIORITY_BUCKETS[bucketName].has(service);
};

// Get all services in a bucket
export const getServicesInBucket = (bucketName) => {
    return PRIORITY_BUCKETS[bucketName] ? [...PRIORITY_BUCKETS[bucketName]] : [];
};

// Get the bucket a service belongs to
export const getBucketForService = (service) => {
    for (const [bucketName, bucketSet] of Object.entries(PRIORITY_BUCKETS)) {
        if (bucketSet.has(service)) {
            return bucketName;
        }
    }
    return null;
};

/**
 * filterTopServices  ▸  Extract only the services that fall into
 * the eight priority buckets above.
 *
 * @param {Map<string, number>} servicesMap – your original Map
 * @returns {Object<string, Map<string, number>>}  e.g. { shelter: Map(…), food: Map(…), … }
 */
export function filterTopServices(servicesMap) {
    const out = {};

    for (const [serviceName, count] of servicesMap) {
        // Find the bucket (if any) that contains this service
        for (const [bucketName, bucketSet] of Object.entries(PRIORITY_BUCKETS)) {
            if (bucketSet.has(serviceName)) {
                if (!out[bucketName]) out[bucketName] = new Map();
                out[bucketName].set(serviceName, count);
                break;  // done once we've matched a bucket
            }
        }
    }
    return out;     // e.g. out.shelter → Map with 8 entries, etc.
}

// Flat result: just the matching services themselves
export function getTopServiceMap(servicesMap) {
    const TOP = new Set(
        Object.values(PRIORITY_BUCKETS).flatMap(set => [...set])
    );
    return new Map([...servicesMap].filter(([svc]) => TOP.has(svc)));
}

// }