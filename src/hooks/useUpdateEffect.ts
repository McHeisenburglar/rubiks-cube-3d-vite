// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useRef } from 'react'

export default function useUpdateEffect(
	callback,
	dependencies: Array<unknown>
) {
	const firstRenderRef = useRef(true)

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false
			return
		}
		return callback()
	}, dependencies)
}
