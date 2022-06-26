import { Fragment, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../redux/axiosInstance";
import Playlist from "../../components/Playlist";
import styles from "./styles.module.scss";

const Home = () => {
	const [firstPlaylists, setFirstPlaylists] = useState([]);
	const [secondPlaylists, setSecondPlaylists] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const getRandomPlaylists = async () => {
		try {
			setIsFetching(true);
			const url ="/playlists/";
			const { data } = await axiosInstance.get(url);
			const array1 = data.data.splice(0, 3);
			const array2 = data.data;
			setFirstPlaylists(array1);
			setSecondPlaylists(array2);
			setIsFetching(false);
		} catch (error) {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		getRandomPlaylists();
	}, []);

	return (
		<Fragment>
			{isFetching ? (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#673ab7" }} size="8rem" />
				</div>
			) : (
				<div className={styles.container}>
					<h1>Boa Tarde</h1>
					<div className={styles.playlists_container}>
						<Playlist playlists={firstPlaylists} />
					</div>
	
					<div className={styles.playlists_container}>
						<Playlist playlists={secondPlaylists} />
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Home;
