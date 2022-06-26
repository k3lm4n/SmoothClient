import { Fragment, useState} from "react";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import { RadioBrowserApi } from "radio-browser-api";
import Station from "../../components/Station";



const Radio = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const api = new RadioBrowserApi("SmoothRadio");



  const handleSearch = async ({ currentTarget: input }) => {
    setSearch(input.value);
    setResults({});
    try {
      setIsFetching(true);
      // const url =`/?search=${input.value}`;
      // await axiosInstance.get(url);
      const data  = await api.searchStations({
        country: input.value,
		limit:100,
		
      });
      console.log(data);
      setResults(data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search_input_container}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input
          type="text"
          placeholder="Pesqise por País"
          onChange={handleSearch}
          value={search}
        />
        <IconButton onClick={() => setSearch("")}>
          <ClearIcon />
        </IconButton>
      </div>
      {isFetching && (
        <div className={styles.progress_container}>
          <CircularProgress style={{ color: "#673ab7" }} size="5rem" />
        </div>
      )}
      {Object.keys(results).length !== 0 && (
        <div className={styles.results_container}>
          {results.length !== 0 && (
            <div className={styles.songs_container}>
              {results.map((station) => (
                <Fragment key={station.id}>
                  <Station station={station} />
				 
                </Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Radio;
