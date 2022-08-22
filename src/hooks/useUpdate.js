import { useState } from "react";

const useUpdate = () => {
	const [mark, setMark] = useState(Date.now());
	const updateMark = () => setMark(Date.now());
	return [mark, updateMark];
};

export default useUpdate;
