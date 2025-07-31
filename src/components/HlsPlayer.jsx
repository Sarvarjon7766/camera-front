// components/HlsPlayer.jsx
import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

const HlsPlayer = ({ src }) => {
	const videoRef = useRef(null)

	useEffect(() => {
		let hls
		const video = videoRef.current

		if (video && src) {
			if (Hls.isSupported()) {
				hls = new Hls()
				hls.loadSource(src)
				hls.attachMedia(video)
			} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.src = src
			}
		}

		return () => {
			if (hls) {
				hls.destroy()
			}
		}
	}, [src])

	return (
		<video
			ref={videoRef}
			controls
			autoPlay
			muted
			className="w-full h-full"
		/>
	)
}

export default HlsPlayer
