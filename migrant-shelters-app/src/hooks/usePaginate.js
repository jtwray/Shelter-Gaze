import React, { useMemo } from "react"

const chunkArray = (chunkSize) => (array) => {
	return array.reduce((acc, each, index, src) => {
		if (!(index % chunkSize)) {
			return [...acc, src.slice(index, index + chunkSize)]
		}
		return acc
	}, [])
}

export const usePagination = (array, size) => {
	const chunkedArray = useMemo(() => chunkArray(size)(array), [size, array])

	return [chunkedArray]
}