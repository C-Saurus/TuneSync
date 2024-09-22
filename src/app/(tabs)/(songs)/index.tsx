import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useLibraryStore } from '@/store/library'
import { useQueueStore } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native'
import TrackPlayer from 'react-native-track-player'
let init = 0
const SongsScreen = () => {
	const { t } = useTranslation()
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: t('songs.search'),
		},
	})

	const { setTracks, tracks, tracksMap } = useLibraryStore((state) => state)
	const { queueListWithContent, activeQueueId } = useQueueStore((state) => state)
	const loadQueue = async () => {
		await TrackPlayer.setQueue(queueListWithContent[activeQueueId])
		init = 1
	}
	useEffect(() => {
		setTracks(tracksMap)
		console.log('trackMap', tracksMap)
		return () => {}
	}, [setTracks, tracksMap])
	console.log('tracks', tracks)
	useEffect(() => {
		if (init === 0) {
			loadQueue()
		}
	})

	const filteredTracks = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

	return (
		<SafeAreaView style={defaultStyles.container}>
			<TracksList
				style={{
					paddingHorizontal: screenPadding.horizontal,
					// paddingTop: search ? 20 : 200,
				}}
				id={generateTracksListId('songs', search)}
				tracks={[
					{
						id: '0',
						url: 'https://res.cloudinary.com/phuockaito/video/upload/v1657265009/audio/ox6fb6rwkhrcabcjbm6x.mp3', // Load media from the network
						title: 'Alone',
						artist: 'Alan Walker',
						album: 'while(1<2)',
						genre: 'Progressive House, Electro House',
						date: '2014-05-20T07:00:00+00:00', // RFC 3339
						artwork:
							'https://res.cloudinary.com/phuockaito/image/upload/v1657265008/image_music/wg1aq20dyvoei3xxitg2.jpg', // Load artwork from the network,
						duration: 160,
					},
					{
						id: '1',
						url: 'https://res.cloudinary.com/phuockaito/video/upload/v1657265329/audio/kqmkumgyxjq8209c6in7.mp3', // Load media from the network
						title: 'Spectre',
						artist: 'Alan Walker',
						album: 'while(1<2)',
						genre: 'Progressive House, Electro House',
						date: '2014-05-20T07:00:00+00:00', // RFC 3339
						artwork:
							'https://res.cloudinary.com/phuockaito/image/upload/v1657265328/image_music/s9rsahac0duv6fiydulb.jpg', // Load artwork from the network
						duration: 320,
					},
				]}
				scrollEnabled={true}
				search={search}
			/>
		</SafeAreaView>
	)
}

export default SongsScreen
