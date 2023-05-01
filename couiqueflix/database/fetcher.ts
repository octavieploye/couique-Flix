import axios from "axios";

// Fetch data from a URL
const fetcher = (url: string) => axios
    .get(url)
    .then((res) => res.data);

    export default fetcher;