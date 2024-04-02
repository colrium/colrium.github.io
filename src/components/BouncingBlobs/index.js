import { use, useEffect, useRef } from "react";
import BouncingBlob from "./BouncingBlob";

const BouncingBlobs = () => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            const blobEls = ref.current.querySelectorAll('.bouncing-blob');
			const glass = ref.current.querySelector('.bouncing-blobs-glass');
			const container = ref.current.querySelector('.bouncing-blobs-container');
             const blobs = Array.from(blobEls).map((blobEl) => new BouncingBlob(blobEl));

				function update() {
					requestAnimationFrame(update);
					blobs.forEach((blob) => {
						blob.update();
						blob.move();
					});
				}

				requestAnimationFrame(update);
		}
        

    }, []);
    return (
		<div className="bouncing-blobs-container" ref={ref}>
			<div className="bouncing-blobs-glass"></div>
			<div className="bouncing-blobs">
				<div className="bouncing-blob bouncing-blob--blue"></div>
				<div className="bouncing-blob bouncing-blob--blue"></div>
				<div className="bouncing-blob bouncing-blob--blue"></div>
				{/* <div className="bouncing-blob bouncing-blob--white"></div> */}
				<div className="bouncing-blob bouncing-blob--purple"></div>
				<div className="bouncing-blob bouncing-blob--purple"></div>
				<div className="bouncing-blob bouncing-blob--pink"></div>
			</div>
		</div>
	);

}

export default BouncingBlobs;